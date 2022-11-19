<p align="center">
<img src="https://res.cloudinary.com/dunrf5nc7/image/upload/v1668758979/logo_yhjjeb.png" >
<h1 align="center">Person Verification Digital Platform - Issuer Web Application</h1>
</p>

---

<p>
<h3>Description:</h3>
<h6>This repositary contains all the frontend and baceknd materials for the issuer's web application of Person Verification Digital Platform</h6>
<h6>This application is responsible for granting the eligibility of the verifiers and the wallet owners to use digital distributed identity</h6>
</p>

---

<p>
<h3>Prerequisites:</h3>
<ul>
<li>NodeJS</li>
<li>NPM</li>
<li>Metamask</li>
</ul>
</p>

---
<p>
<h3>Install Packages:</h3>
<h6>Direct into the client folder which includes package.json and execute the command "npm install"</h6>
<h6>Direct into the server folder which includes package.json and execute the command "npm install"</h6>

</p>

---
<p>
<h3>NPM Commands:</h3>
<h6>Start Front end           :  Direct into the client folder which includes package.json and execute the command "npm start"</h6>
<h6>Start Back end            :  Direct into the server folder which includes package.json and execute the command "npm start"</h6>
<h6>Test Front end            :  Direct into the client folder which includes package.json and execute the command "npm test"</h6>
<h6>Test Back end            :  Direct into the server folder which includes package.json and execute the command "npm test"</h6>

</p>


---
<details>
<summary>📃 Frontend Environment Variables</summary>
  <ul>
  <li>REACT_APP_API_URL = {url of your backeend API + "/api/v1" }</li>
  <li>REACT_APP_SITE_NAME = {your site name}</li>
  <li>REACT_APP_SECRET_KEY = {symmetric key shared by both web and the mobile app for encryption and decryption}</li>
  <li>REACT_APP_SECRET = {symmetric key shared by both web and the mobile app for verification of the application}</li>
  </ul>
</details>


---
<details>
<summary>📃 Backend Environment Variables</summary>
  <ul>
<li>DATABASE={mongodb database name}</li>
<li>CONNECTION_STRING = {mongodb database connection string}</li>
<li>API_URL = /api/v1</li>
<li>pvdp_jwtPrivateKey = {jwt seceret key}</li>
<li>TRANSPORTER_USERNAME = {email address of your account used for mail services of the web app}</li>
<li>TRANSPORTER_PWD = {password of the mail service account}</li>
<li>CLOUD_NAME = {cloudinary credetials: cloud name}</li>
<li>CLOUD_KEY = {cloudinary credetials: cloud key}</li>
<li>CLOUD_KEY_SECRET = {cloudinary credetials: cloud key secret}</li>
  </ul>
</details>
