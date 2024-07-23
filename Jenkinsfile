pipeline {
    agent any

    environment {
        DB_USER = credentials('DB_USER')
        DB_PASS = credentials('DB_PASS')
        DB_HOST = credentials('DB_HOST')
        DB_PORT = credentials('DB_PORT')
        DB_NAME = credentials('DB_NAME')
        VITE_LOGIN_URL = credentials('VITE_LOGIN_URL')
    }

    stages {
        stage('Delete all'){
            steps {
                sh '''
                    sudo rm -rf ./*
                '''
            }
        }
        stage('copy node for dockerfile'){
            steps {
                sh '''
                    sudo cp -r /home/desarrollo/dependencies/node-v22.5.1-linux-x64.tar.xz .
                '''
            }
        }
        stage('generate .env file and install dependencies and build') {
            steps {
                sh '''
                    echo "VITE_API_URL=/api" > client/.env
                    echo "VITE_LOGIN_URL=${VITE_LOGIN_URL}" >> client/.env
                '''
                sh '''
                    cd client
                    yarn install
                '''
                sh '''
                    cd client
                    yarn build
                '''
            }
        }
        stage('generate .env /api'){
          steps {
            sh '''
              echo "PORT=4040" > api/.env
              echo "DB_USER=${DB_USER}" >> api/.env
              echo "DB_PASS=${DB_PASS}" >> api/.env
              echo "DB_HOST=${DB_HOST}" >> api/.env
              echo "DB_PORT=${DB_PORT}" >> api/.env
              echo "DB_NAME=${DB_NAME}" >> api/.env
            '''
          }
        }
        stage('Remove Containers'){
            steps {
                sh '''
                    if sudo docker ps -a | grep -q cartera-web; then
                        sudo docker stop cartera-web
                        sudo docker rm cartera-web
                    fi
                    if sudo docker ps -a | grep -q cartera-api; then
                        sudo docker stop cartera-api
                        sudo docker rm cartera-api
                    fi
                '''
            }
        }
        stage('Build Docker Images') {
            steps {
              sh '''
                sudo docker compose up -d
              '''
            }
        }
    }
}