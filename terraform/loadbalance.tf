# terraform {
#     required_providers {
#        aws = {
#         version = "~> 3.0"
#         source = "hashicorp/aws"
#        }
#     }
    
  
# }

# provider "aws" {
#     region = "us-east-1"
# }

# resource "aws_vpc" "SpinDrift_vpc" {
#     cidr_block = "10.0.0.0/16"
# }

# resource "aws_security_group" "spindrift_security_group" {
#     name        = "spindrift_security_group"
#     description = "Allow SSH and HTTP access"
#     vpc_id      = aws_vpc.SpinDrift_vpc.id  # Link the security group to the VPC

#     ingress {
#         from_port   = 22
#         to_port     = 22
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#   }

#     ingress {
#         from_port   = 80
#         to_port     = 80
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#   }

#   ingress {
#         from_port   = 3000
#         to_port     = 3000
#         protocol    = "tcp"
#         cidr_blocks = ["0.0.0.0/0"]
#   }

#   ingress {
#     from_port   = 80
#     to_port     = 80
#     protocol    = "tcp"
#     security_groups = [aws_security_group.lb_sg.id]  # Allow ALB to talk to EC2 instances
#   }

#     egress {
#         from_port   = 0
#         to_port     = 0
#         protocol    = "-1"
#         cidr_blocks = ["0.0.0.0/0"]
#   }
# }

# resource "aws_subnet" "SpinDrift_a_subnet" {
#     vpc_id = aws_vpc.SpinDrift_vpc.id
#     cidr_block = "10.0.1.0/24"
#     availability_zone = "us-east-1a"
#     map_public_ip_on_launch = true
# }

# resource "aws_subnet" "SpinDrift_b_subnet" {
#     vpc_id = aws_vpc.SpinDrift_vpc.id
#     cidr_block = "10.0.2.0/24"
#     availability_zone = "us-east-1b"
#     map_public_ip_on_launch = true
# }

# resource "aws_internet_gateway" "SpinDrift_internet_gw" {
#     vpc_id = aws_vpc.SpinDrift_vpc.id
# }

# resource "aws_route_table" "SpinDrift_route_table" {
#     vpc_id = aws_vpc.SpinDrift_vpc.id

#     route {
#         cidr_block = "0.0.0.0/0"
#         gateway_id = aws_internet_gateway.SpinDrift_internet_gw.id
#     }
# }

# resource "aws_route_table_association" "SpinDrift_a_association" {
#     route_table_id = aws_route_table.SpinDrift_route_table.id
#     subnet_id = aws_subnet.SpinDrift_a_subnet.id
# }

# resource "aws_route_table_association" "SpinDrift_b_association" {
#     route_table_id = aws_route_table.SpinDrift_route_table.id
#     subnet_id = aws_subnet.SpinDrift_b_subnet.id
# }

# resource "aws_instance" "SpinDrift_a" {
#     ami           = "ami-011899242bb902164"  # Ensure this AMI ID is valid for the region and is a suitable base image
#     instance_type = "t2.micro"
#     subnet_id = aws_subnet.SpinDrift_a_subnet.id
#     associate_public_ip_address = true
#     vpc_security_group_ids = [aws_security_group.spindrift_security_group.id]

#   # User data script to install Docker and run a container
#   user_data = <<-EOF
#     #!/bin/bash
#     set -e
#     exec > /var/log/user-data.log 2>&1

#     echo "Adding SSH key..."
#     echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCvTPVuWj8kzsdSF6Giew2zDU3raAnaUd73b0UwelqVsYC9QF3LKzRei6u99bLbvV7wbAcf9Tbt+7khY8Hm9wkIxB5b2C/vHGR+E+lQzSxyfjD4Azrdwx1E+8h3LVUo+UentLh08L3Prr+MlsmrpkvP2DwpmsB7sT/+czXs/4HQPQA34jEyOz1CRvv9DDxxyuHzME9hwt5o4sjHs6QTNiVCSLXWI2SqW8RoL9N6I0/414vsFk0HyGKqj+MwnD0Z+Z0HhHQn5KCsT+qrgNMvZUR5uh5LP2s3GuBD/d4z3EHvZO9q9BlG9x4y38yfBC7YyAtjRi2HodLRFXjhppo4bkGoCSHcRG5V2MtuhI2t7LQ/u/H236qi0ZTADZrOzNISIYNJF/yagQlJMnVzifun4K4nWmh9rMdjKI1nrRULaHEbefemCoEqGeve+VnxACt/uvxQ2QFNCj5PuAe9YthE/pkzgHiDAPH+CcOb+Ginj/DPUkutIpXt0FtAPm4IYPJcZ+eOE5vsoUiPZ7mP6l7s6raebXaIEICYvo3g0BpNHotGP41Uit7oui61cHh9IbSbunpsGy12tJNISQ4ykgsVO3k7ypsDvaiaD8HbXN5Ok2PDxMJSXyA95vpCf6wccUv9+7CELghBEP2XuqEyFnlK0fRFRdkuaNR0jeA6ycqJStkgFw== graysondeiley@Graysons-Laptop.local" >> /home/ubuntu/.ssh/authorized_keys

#     echo "Updating package list..."
#     sudo apt-get update -y
#     echo "Installing Docker..."
#     sudo apt-get install -y docker.io
#     sudo systemctl start docker
#     sudo systemctl enable docker

#     # Create a systemd service to pull and run the Docker image
#     cat <<EOT | sudo tee /etc/systemd/system/spindrift.service
#     [Unit]
#     Description=Run SpinDrift Docker Container
#     After=docker.service

#     [Service]
#     ExecStart=/usr/bin/docker run -d -p 3000:3000 --name SpinDrift gdeiley0311/spindriftimageci:latest
#     Restart=always

#     [Install]
#     WantedBy=multi-user.target
#     EOT

#     # Enable and start the service
#     sudo systemctl enable spindrift.service
#     sudo systemctl start spindrift.service
# EOF




#   tags = {
#     Name = "SpinDrift_a"
#   }
# }

# output "instance_public_ip" {
#   value = aws_instance.SpinDrift_a.public_ip
# }

# output "spindrift_link" {
#   value = "http://${aws_instance.SpinDrift_a.public_ip}:3000/profile"
# }

# resource "aws_instance" "SpinDrift_b" {
#     ami           = "ami-011899242bb902164"  # Ensure this AMI ID is valid for the region and is a suitable base image
#     instance_type = "t2.micro"
#     subnet_id = aws_subnet.SpinDrift_b_subnet.id
#     associate_public_ip_address = true
#     vpc_security_group_ids = [aws_security_group.spindrift_security_group.id]

#   # User data script to install Docker and run a container
#   user_data = <<-EOF
#     #!/bin/bash
#     set -e
#     exec > /var/log/user-data.log 2>&1

#     echo "Adding SSH key..."
#     echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCvTPVuWj8kzsdSF6Giew2zDU3raAnaUd73b0UwelqVsYC9QF3LKzRei6u99bLbvV7wbAcf9Tbt+7khY8Hm9wkIxB5b2C/vHGR+E+lQzSxyfjD4Azrdwx1E+8h3LVUo+UentLh08L3Prr+MlsmrpkvP2DwpmsB7sT/+czXs/4HQPQA34jEyOz1CRvv9DDxxyuHzME9hwt5o4sjHs6QTNiVCSLXWI2SqW8RoL9N6I0/414vsFk0HyGKqj+MwnD0Z+Z0HhHQn5KCsT+qrgNMvZUR5uh5LP2s3GuBD/d4z3EHvZO9q9BlG9x4y38yfBC7YyAtjRi2HodLRFXjhppo4bkGoCSHcRG5V2MtuhI2t7LQ/u/H236qi0ZTADZrOzNISIYNJF/yagQlJMnVzifun4K4nWmh9rMdjKI1nrRULaHEbefemCoEqGeve+VnxACt/uvxQ2QFNCj5PuAe9YthE/pkzgHiDAPH+CcOb+Ginj/DPUkutIpXt0FtAPm4IYPJcZ+eOE5vsoUiPZ7mP6l7s6raebXaIEICYvo3g0BpNHotGP41Uit7oui61cHh9IbSbunpsGy12tJNISQ4ykgsVO3k7ypsDvaiaD8HbXN5Ok2PDxMJSXyA95vpCf6wccUv9+7CELghBEP2XuqEyFnlK0fRFRdkuaNR0jeA6ycqJStkgFw== graysondeiley@Graysons-Laptop.local" >> /home/ubuntu/.ssh/authorized_keys

#     echo "Updating package list..."
#     sudo apt-get update -y
#     echo "Installing Docker..."
#     sudo apt-get install -y docker.io
#     sudo systemctl start docker
#     sudo systemctl enable docker

#     # Create a systemd service to pull and run the Docker image
#     cat <<EOT | sudo tee /etc/systemd/system/spindrift.service
#     [Unit]
#     Description=Run SpinDrift Docker Container
#     After=docker.service

#     [Service]
#     ExecStart=/usr/bin/docker run -d -p 3000:3000 --name SpinDrift gdeiley0311/spindriftimageci:latest
#     Restart=always

#     [Install]
#     WantedBy=multi-user.target
#     EOT

#     # Enable and start the service
#     sudo systemctl enable spindrift.service
#     sudo systemctl start spindrift.service
# EOF




#   tags = {
#     Name = "SpinDrift_b"
#   }
# }

# output "instance_public_ip_b" {
#   value = aws_instance.SpinDrift_b.public_ip
# }

# output "spindrift_link_b" {
#   value = "http://${aws_instance.SpinDrift_b.public_ip}:3000/profile"
# }

# # Security Group for Load Balancer (ALB)
# resource "aws_security_group" "lb_sg" {
#   name        = "app-lb-sg"
#   description = "Allow traffic to the Load Balancer on port 80"
#   vpc_id      = aws_vpc.SpinDrift_vpc.id

#   ingress {
#     from_port   = 80
#     to_port     = 80
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

# # Create Load Balancer (ALB)
# resource "aws_lb" "app_lb" {
#   name               = "app-lb"
#   internal           = false
#   load_balancer_type = "application"
#   security_groups    = [aws_security_group.lb_sg.id]

#   # Associate with subnets in different Availability Zones
#   subnets = [aws_subnet.SpinDrift_a_subnet.id, aws_subnet.SpinDrift_b_subnet.id]

#   enable_deletion_protection = false

#   tags = {
#     Name = "App Load Balancer"
#   }
# }


# # Create Target Group for EC2 instances listening on port 3000
# resource "aws_lb_target_group" "app_target_group" {
#   name     = "app-target-group"
#   port     = 3000
#   protocol = "HTTP"
#   vpc_id   = aws_vpc.SpinDrift_vpc.id

#   health_check {
#     path                = "/health"
#     interval            = 30
#     timeout             = 5
#     healthy_threshold   = 3
#     unhealthy_threshold = 3
#   }

#   tags = {
#     Name = "App Target Group"
#   }
# }

# # Attach EC2 Instance 1 to the Target Group
# resource "aws_lb_target_group_attachment" "example_a" {
#   target_group_arn = aws_lb_target_group.app_target_group.arn
#   target_id        = aws_instance.SpinDrift_a.id
#   port             = 3000  # Forward traffic to port 3000 on the instance
# }

# # Attach EC2 Instance 2 to the Target Group
# resource "aws_lb_target_group_attachment" "example_b" {
#   target_group_arn = aws_lb_target_group.app_target_group.arn
#   target_id        = aws_instance.SpinDrift_b.id
#   port             = 3000  # Forward traffic to port 3000 on the instance
# }

# resource "aws_lb_listener" "http_listener" {
#   load_balancer_arn = aws_lb.app_lb.arn
#   port              = 80    # The ALB listener will still listen on port 80
#   protocol          = "HTTP"

#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.app_target_group.arn  # Points to target group on port 3000
#   }
# }

# output "lb_dns_name" {
#   value = aws_lb.app_lb.dns_name  # This will output the DNS name of the Load Balancer
# }
