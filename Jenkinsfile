pipeline{
    agent any
    stages{
        stage('Install dependencies Client And Build'){
            steps{
                script{
                    sh 'cd client && yarn'
                    sh 'cd client && yarn build'
                }
            }

        }
    }
}