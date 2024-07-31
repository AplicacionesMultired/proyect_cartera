pipeline {
    agent any
    
    tools {
        nodejs 'node-v22' // Asegúrate de que el nombre coincide con la configuración en Jenkins
    }

    environment {
        ENV_API = credentials('ENV_API_CARTERA')
        ENV_CLIENT_CARTERA = credentials('ENV_CLIENT_CARTERA')
    }
    
    stages {
        stage('delete workspace') {
            steps {
                dir('proyect_cartera') {
                    deleteDir()
                }
            }
        }
        stage('clone repository') {
            steps {
                script {
                    sh 'git clone https://github.com/AplicacionesMultired/proyect_cartera.git'
                }
            }
        }
        stage('install dependencies') {
            steps {
                script {
                    sh 'cd ./proyect_cartera/client && yarn'
                    sh 'cd ./proyect_cartera/api && yarn'
                }
            }
        }
        stage('Copy .env files') {
            steps {
                script {
                    // Read the content of the credential files
                    def envApiContent = readFile(ENV_API)
                    def envClientContent = readFile(ENV_CLIENT_CARTERA)
                    
                    // Write the content to the respective .env files
                    writeFile file: './api/.env', text: envApiContent
                    writeFile file: './client/.env', text: envClientContent
                }
            }
        }
        stage('build client') {
            steps {
                script {
                    sh 'cd ./proyect_cartera/client && yarn build'
                    sh 'cd ./proyect_cartera/api && yarn build'
                }
            }
        }
        stage('down docker compose'){
            steps {
                script {
                    sh 'docker compose -f ./proyect_cartera/docker-compose.yaml down'
                }
            }
        }
        stage('delete images'){
            steps {
                script {
                    sh 'docker rmi client:v1 api-cartera:v1'
                }
            }
        }
        stage('run docker compose'){
            steps {
                script {
                    sh 'docker compose -f ./proyect_cartera/docker-compose.yaml up -d'
                }
            }
        }
    }
}