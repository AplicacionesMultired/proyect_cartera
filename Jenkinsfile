pipeline{
    agent any
    stages{
        stage('Install dependencies Client And Build'){
            steps{
                script{
                    sh 'npm install'
                    sh 'npm run build'
                }
            }

        }
    }
}