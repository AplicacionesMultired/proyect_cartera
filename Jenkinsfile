pipeline{
    agent any
    environment {
        ENV_FILE_API = credentials('ENV_API_CARTERA')
        ENV_FILE_CLIENT = credentials('ENV_CLIENT_CARTERA')
    }
    stages{
        stage('Copy Environment Variables Client') {
            steps {
                script {
                    // Copiar el archivo de variables de entorno al directorio del cliente
                    sh 'cp $ENV_FILE_CLIENT client/.env'
                }
            }
        }
        stage('Copy Environment Variables Api') {
            steps {
                script {
                    // Copiar el archivo de variables de entorno al directorio del cliente
                    sh 'cp $ENV_FILE_API api/.env'
                }
            }
        }
        stage('Install dependencies Client And Build'){
            steps{
                script{
                    sh 'cd client && yarn'
                    sh 'cd client && yarn build'
                }
            }
        }
        stage('Install dependencies Client And Build'){
            steps{
                script{
                    sh 'cd api && yarn'
                    sh 'cd api && yarn build'
                }
            }
        }
        // stage('Stop and delete containers if exist'){
        //     steps{
        //         script{
        //             sh 'docker-compose down'
        //         }
        //     }
        // }
        stage('Build and run containers'){
            steps{
                script{
                    sh 'docker compose up -d'
                }
            }
        }
    }
}