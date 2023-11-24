# Information Security Encryption Task

## Introduction 👋

This repository is used for doing encryption on a image, pdf, or a video, assigned by mr. Baskoro Adi on Information Security Course on ITS Surabaya. This project is created to fulfill assignment 1, 2, and 3 in Information Security class. The objective of this project is to create a simple Web Storage App. The App will have the ability to store user’s private data in a database, and also any type of user’s file, such as user’s ID Card image, PDF/DOC/XLS files, video files, etc. The stored data in the server will be encrypted with AES, RC4, or DES algorithm, depending on the user’s preference. However, users can still retrieve their own data after being decrypted. Any users will be able to see all of the files (only the name and the owner is visible), but they can only download their own file. To download other user's file, a user must submit request to access the file of the owner. After requesting, the owner of the file will receive an email that will grant the access for the requester to access the file. Then the requester will receive the encrypted key and encrypted initial value to access the file. The encryption process is asymmetric, meaning even if the encrypted key is used by another user, the file still can't be accessed. For the authentication, users can register their account by  submitting their name, email and password, and also it is mandatory to input their ID Card as well. The purpose of this assignment is to compare each encryption algorithm by comparing their encryption/decryption speed.

## Team Members 🧑

Group 7

| Name                   | NRP        |
| ---------------------- | ---------- |
| Adrian Karuna Soetikno | 5025211019 |
| Andrian                | 5025211079 |
| Warren Gerald Polandra | 5025201233 |
| Daniel Hermawan        | 5025201087 |

## Relevant Repositories/link✨
| TYPE | LINK                                           |
| ---- | ---------------------------------------------- |
| Back End Implementation | https://github.com/Adrian0429/InformationSecurity_Be |

## How To Use This Repository 🛠️
1. Clone this repository
2. In your terminal, type `cd .\encryption-app\`
3. Run `npm install`
4. Run `npm run dev`
5. Don't forget to start the server first (from the back end repository shown above)
6. Type `localhost:3000` in your browser
7. Now you can access the application (づ｡◕‿◕｡)づ
