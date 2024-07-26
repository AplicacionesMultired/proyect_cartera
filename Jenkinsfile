pipeline{
    agent any
    environment {
        DB_USER = credentials('DB_PB_USER')
        DB_PASS = credentials('DB_PB_PASS')
        DB_HOST = credentials('DB_PB_HOST')
        DB_PORT = credentials('DB_PB_PORT')
        DB_NAME = credentials('DB_PB_NAME')
        VITE_LOGIN_URL = credentials('VITE_LOGIN_URL_CARTERA_APP')
    }
    stages{
        stage('Delete the workspace'){
            steps{
                deleteDir()
            }
        }
        stage('Clone Repository'){
            steps{
                git 'https://github.com/llOrtegall/proyect_cartera.git'
            }
        }
        stage('generate .env /api'){
          steps {
            sh '''
              echo "PORT=4040" > api/.env
              echo "DB_USER='${DB_USER}'" >> api/.env
              echo "DB_PASS='${DB_PASS}'" >> api/.env
              echo "DB_HOST='${DB_HOST}'" >> api/.env
              echo "DB_PORT='${DB_PORT}'" >> api/.env
              echo "DB_NAME='${DB_NAME}'" >> api/.env
            '''
          }
        }
        stage('Install Dependecies API'){
            steps{
                sh 'cd api && yarn'
                sh 'cd api && yarn build'
            }
        }
        stage('generate .env /client'){
          steps {
              sh '''
                echo "VITE_API_URL=/api" > client/.env
                echo "VITE_LOGIN_URL='${VITE_LOGIN_URL}'" >> client/.env              
              '''
          }
        }
        stage('Install Dependecies Client'){
            steps{
                sh 'cd client && yarn'
                sh 'cd client && yarn build'
            }
        }
        stage('Remove Containers if exist') {
            steps {
                sh '''
                    if docker ps -a | grep -q cartera-web; then
                        docker stop cartera-web
                        docker rm cartera-web
                    fi
                    if docker ps -a | grep -q cartera-api; then
                        docker stop cartera-api
                        docker rm cartera-api
                    fi
                '''
            }
        }
        stage('Build Docker Images') {
            steps {
              sh "docker compose up -d"
            }
        }
    }
}