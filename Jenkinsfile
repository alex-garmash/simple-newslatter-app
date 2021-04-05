pipeline {
    agent any
    environment {
        registry = 'mafiozi/jenkins-test'
        registryCredential = 'dockerhub'
        dockerImage = ''
    }

    stages {
        stage('Build') {
            parallel {
                stage('NodeJs') {
                    agent {
                        docker {
                            image 'node'
                        }
                    }
                    steps {
                        sh 'node --version'
                    }
                }

                stage('Docker') {
                    agent {
                        docker {
                            image 'docker'
                        }
                    }
                    steps {
                        sh 'docker --version'
                    }
                }

            }
        }
        /*
        stage('Cloning Git') {
            steps {
                git 'https://github.com/.git'
            }
        }
        */
        stage('Building our image') {
            steps{
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
                  echo "Build number #${env.BUILD_NUMBER}"
            }
        }
        stage('Deploy our image') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Cleaning up') {
            steps{
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }
    }
}