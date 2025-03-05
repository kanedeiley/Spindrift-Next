terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "SpinDrift" {
  ami           = "ami-011899242bb902164"  # Ensure this AMI ID is valid for the region and is a suitable base image
  instance_type = "t2.micro"

  # User data script to install Docker and run a container
  user_data = <<-EOF
    #!/bin/bash
    set -e
    exec > /var/log/user-data.log 2>&1

    echo "Adding SSH key..."
    echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCvTPVuWj8kzsdSF6Giew2zDU3raAnaUd73b0UwelqVsYC9QF3LKzRei6u99bLbvV7wbAcf9Tbt+7khY8Hm9wkIxB5b2C/vHGR+E+lQzSxyfjD4Azrdwx1E+8h3LVUo+UentLh08L3Prr+MlsmrpkvP2DwpmsB7sT/+czXs/4HQPQA34jEyOz1CRvv9DDxxyuHzME9hwt5o4sjHs6QTNiVCSLXWI2SqW8RoL9N6I0/414vsFk0HyGKqj+MwnD0Z+Z0HhHQn5KCsT+qrgNMvZUR5uh5LP2s3GuBD/d4z3EHvZO9q9BlG9x4y38yfBC7YyAtjRi2HodLRFXjhppo4bkGoCSHcRG5V2MtuhI2t7LQ/u/H236qi0ZTADZrOzNISIYNJF/yagQlJMnVzifun4K4nWmh9rMdjKI1nrRULaHEbefemCoEqGeve+VnxACt/uvxQ2QFNCj5PuAe9YthE/pkzgHiDAPH+CcOb+Ginj/DPUkutIpXt0FtAPm4IYPJcZ+eOE5vsoUiPZ7mP6l7s6raebXaIEICYvo3g0BpNHotGP41Uit7oui61cHh9IbSbunpsGy12tJNISQ4ykgsVO3k7ypsDvaiaD8HbXN5Ok2PDxMJSXyA95vpCf6wccUv9+7CELghBEP2XuqEyFnlK0fRFRdkuaNR0jeA6ycqJStkgFw== graysondeiley@Graysons-Laptop.local" >> /home/ubuntu/.ssh/authorized_keys

    echo "Updating package list..."
    sudo apt-get update -y
    echo "Installing Docker..."
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker

    # Create a systemd service to pull and run the Docker image
    cat <<EOT | sudo tee /etc/systemd/system/spindrift.service
    [Unit]
    Description=Run SpinDrift Docker Container
    After=docker.service

    [Service]
    ExecStart=/usr/bin/docker run -d -p 3000:3000 --name SpinDrift surfspindrift/spindriftimageci:latest
    Restart=always

    [Install]
    WantedBy=multi-user.target
    EOT

    # Enable and start the service
    sudo systemctl enable spindrift.service
    sudo systemctl start spindrift.service
EOF




  tags = {
    Name = "SpinDrift"
  }
}

output "instance_public_ip" {
  value = aws_instance.SpinDrift.public_ip
}

output "spindrift_link" {
  value = "http://${aws_instance.SpinDrift.public_ip}:3000/profile"
}

