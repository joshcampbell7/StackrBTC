terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.6.0"
}

provider "aws" {
  region = "eu-west-2"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block             = "10.0.0.0/16"
  instance_tenancy       = "default"
  enable_dns_support     = true
  enable_dns_hostnames   = true
  tags = { Name = "stackr-vpc" }
}

# Public Subnets
resource "aws_subnet" "public1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "eu-west-2a"
  map_public_ip_on_launch = true
  tags = { Name = "public-subnet-1" }
}

resource "aws_subnet" "public2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "eu-west-2b"
  map_public_ip_on_launch = true
  tags = { Name = "public-subnet-2" }
}

# Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
  tags = { Name = "stackr-igw" }
}

# Public Route Table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = { Name = "public-route-table" }
}

# Route Table Associations
resource "aws_route_table_association" "public1" {
  subnet_id      = aws_subnet.public1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public2" {
  subnet_id      = aws_subnet.public2.id
  route_table_id = aws_route_table.public.id
}

# RDS Subnet Group (Public Subnets)
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "rds-subnet-group"
  subnet_ids = [aws_subnet.public1.id, aws_subnet.public2.id]
  tags = { Name = "rds-subnet-group" }
}

# RDS Security Group
resource "aws_security_group" "rds_sg" {
  name   = "rds-security-group"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # For testing only
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "rds-sg" }
}

# RDS Instance (Public)
resource "aws_db_instance" "mydb" {
  allocated_storage      = 20
  engine                 = "mysql"
  engine_version         = "8.0"
  instance_class         = "db.t3.micro"
  db_name                = "stackr"
  username               = "emcun"
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
  publicly_accessible    = true

  tags = { Name = "stackr-rds" }
}


# Security Group for EC2 Instance
resource "aws_security_group" "ec2_sg" {
  name   = "ec2-security-group"
  vpc_id = aws_vpc.main.id

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Replace with your IP for security, or 0.0.0.0/0 for open SSH (not recommended)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ec2-sg"
  }
}

# EC2 Instance - free tier eligible t3.micro
resource "aws_instance" "web" {
  ami                         = "ami-0bc8d5c547360e648" # Ubuntu 22.04 LTS in eu-west-2 (check latest in your region)
  instance_type               = "t3.micro"
  subnet_id                   = aws_subnet.public1.id
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = true
  key_name                    = "stackr-key" # You must create/import this in AWS before use

  tags = {
    Name = "stackr-ec2-instance"
  }
}
