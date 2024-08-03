pipeline {
    agent any
    
    tools {
        nodejs 'node-v22' // Asegúrate de que el nombre coincide con la configuración en Jenkins
    }

    environment {
        ENV_API_CARTERA = credentials('ENV_API_CARTERA')
        ENV_CLIENT_CARTERA = credentials('ENV_CLIENT_CARTERA')
    }
    
    stages {
        stage('Copy .env files') {
            steps {
                script {
                    // Read the content of the credential files
                    def envApiContent = readFile(ENV_API_CARTERA)
                    def envClientContent = readFile(ENV_CLIENT_CARTERA)
                    
                    // Write the content to the respective .env files
                    writeFile file: './api/.env', text: envApiContent
                    writeFile file: './client/.env', text: envClientContent
                }
            }
        }
        stage('install dependencies') {
            steps {
                script {
                    sh 'cd ./client && yarn'
                    sh 'cd ./client && yarn build'
                }
            }
        }

        stage('delete files on nginx'){
            steps {
                script {
                    sh "sudo rm -r ./* /home/containers/nginx-proxy/html/cartera"
                }
            }
        }

        stage('create folder on nginx'){
            steps {
                script {
                    sh "sudo mkdir /home/containers/nginx-proxy/html/cartera"
                }
            }
        }

        stage('copy files to nginx'){
            steps {
                script {
                    sh "sudo cp -r ./client/dist /home/containers/nginx-proxy/html/cartera"
                }
            }
        }

        stage('down docker compose'){
            steps {
                script {
                    sh 'docker compose down'
                }
            }
        }
        stage('delete images'){
            steps{
                script {
                    def images = 'api-cartera:v1.1'
                    if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
                        sh "docker rmi ${images}"
                    } else {
                        echo "Image ${images} does not exist."
                        echo "continuing..."
                    }
                    // images.each { image ->
                    //     if (sh(script: "docker images -q ${image}", returnStdout: true).trim()) {
                    //         sh "docker rmi ${image}"
                    //     } else {
                    //         echo "Image ${image} does not exist."
                    //     }
                    // }
                }
            }
        }
        stage('run docker compose'){
            steps {
                script {
                    sh 'docker compose up -d'
                }
            }
        }
    }
}