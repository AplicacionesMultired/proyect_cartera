pipeline{
    agent any
    stages{
        stage('Descarga Node v22.5'){
            steps{
                script{
                    sh 'curl -o node-v22.5.tax.xz https://nodejs.org/dist/v22.5.1/node-v22.5.1-linux-x64.tar.xz'
                    sh 'tar -xf node-v22.5.1-linux-x64.tar.xz'
                }
            }
        }
    }
}


// pipeline{
//     agent any
//     environment {
//         ENV_FILE_CLIENT = credentials('ENV_CLIENT_CARTERA')
//         ENV_FILE_API = credentials('ENV_API_CARTERA')
//     }
//     stages{
//         stage('Copy Environment Variables Client') {
//             steps {
//                 script {
//                     // Copiar el archivo de variables de entorno al directorio del cliente
//                     sh 'cp $ENV_FILE_CLIENT client/.env'
//                 }
//             }
//         }
//         stage('Copy Environment Variables Api') {
//             steps {
//                 script {
//                     // Copiar el archivo de variables de entorno al directorio del cliente
//                     sh 'cp $ENV_FILE_API api/.env'
//                 }
//             }
//         }
//         stage('Install dependencies Client And Build'){
//             steps{
//                 script{
//                     sh 'cd client && yarn'
//                     sh 'cd client && yarn build'
//                 }
//             }
//         }
//         stage('Stop and delete containers if exist'){
//             steps{
//                 script{
//                     sh 'docker-compose down'
//                 }
//             }
//         }
//         stage('Build and run containers'){
//             steps{
//                 script{
//                     sh 'docker-compose up --build -d'
//                 }
//             }
//         }
//     }
// }