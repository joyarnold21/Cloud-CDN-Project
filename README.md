# Personal Portfolio Website – Joy Arnold J

**Cloud Computing Academic Project**

- **Name:** Joy Arnold J
- **Institution:** St. Joseph's University (Integrated with Kalvium)
- **Degree:** B.Tech – Computer Science and Engineering (Applied AI)
- **Year:** 2nd Year

---

## 1. About the Project

This is my personal portfolio website, created as part of my Cloud Computing academic project.

The website introduces me, my education, technical skills, projects, and career interests. It also includes my contact information and links to my social profiles.

I built the website using HTML, CSS, and JavaScript. After completing the website, I hosted it on Amazon S3 and used Amazon CloudFront to make it accessible through the internet.

One of the main things I learned from this project was how to host a website securely using AWS services.

## 2. Technologies Used

### Frontend
- HTML5 – Website structure
- CSS3 – Styling and responsive design
- JavaScript – Website interactions

### AWS Services
- **Amazon S3:** Used to store the website files.
- **Amazon CloudFront:** Used to deliver the website content through a CDN.
- **Origin Access Control (OAC):** Configured to allow CloudFront to access the private S3 bucket.
- **Amazon CloudWatch:** Used to monitor website requests, data transfer, and errors through a dashboard.

## 3. Website Sections

My portfolio contains the following sections:

1. **Home:** Introduction and profile information.
2. **About Me:** My background and interests.
3. **Education:** My academic details.
4. **Technical Skills:** Technologies and tools I am learning.
5. **Projects:** A collection of my academic and personal projects.
6. **Certifications and Achievements:** Space to showcase my achievements.
7. **Career Goals:** My future interests and goals.
8. **Contact:** Email and social profile links.

## 4. Project Folder Structure

```text
Cloud-CDN-Project/
│
├── index.html
├── styles.css
├── script.js
├── soo joy.jpeg
├── bucket-policy.json
├── cloudformation.yaml
├── deploy-aws.ps1
├── deploy-aws.sh
├── main.tf
└── README.md
```

The HTML, CSS, JavaScript, and image files are used by the website. The other files are infrastructure configuration and deployment-related files kept in the project folder.

## 5. AWS Deployment

I deployed my portfolio using Amazon S3 and Amazon CloudFront.

### Step 1: Create an S3 Bucket

I created an S3 bucket named:

`my-portfolio-cloud-cdn-2026`

The bucket is hosted in the Asia Pacific (Sydney) region (`ap-southeast-2`).

I uploaded the website files to the bucket.

### Step 2: Keep the S3 Bucket Private

I enabled **Block all public access** to prevent direct public access to the bucket.

### Step 3: Configure CloudFront

I created a CloudFront distribution and selected my S3 bucket as the origin.

I configured:
- Origin Access Control (OAC)
- HTTPS access
- Default root object as `index.html`

### Step 4: Configure OAC

I configured Origin Access Control so that CloudFront can securely access the private S3 bucket.

The signing protocol is Signature Version 4, and the signing behavior is set to Always sign requests.

### Step 5: Update Website Files

Whenever I changed my website, I uploaded the updated files to S3.

I then created a CloudFront invalidation for the changed files so visitors could receive the latest version instead of an older cached version.

## 6. Live Website

**Website URL:**

https://d29drdo0k4588k.cloudfront.net

The website is delivered through Amazon CloudFront using HTTPS.

## 7. Monitoring with CloudWatch

I created an Amazon CloudWatch dashboard named:

`My-Portfolio-Monitoring`

The dashboard includes these CloudFront metrics:

- **Requests:** Number of requests received by CloudFront.
- **BytesDownloaded:** Amount of data delivered to visitors.
- **4xxErrorRate:** Percentage of client-side errors.
- **5xxErrorRate:** Percentage of server-side errors.

This dashboard helps me understand website traffic and monitor errors.

## 8. Testing

After deployment, I performed the following checks:

- Opened the website using the CloudFront URL.
- Checked whether the website loads over HTTPS.
- Verified that the profile image appears correctly.
- Checked the GitHub and email links.
- Used browser Developer Tools to inspect network requests.
- Verified a CloudFront cache response using the `X-Cache` response header.
- Uploaded updated files to S3 and tested the changes after invalidation.
- Checked that S3 Block Public Access remained enabled.

## 9. What I Learned

Through this project, I gained practical experience with:

- Hosting a static website using Amazon S3.
- Understanding how a CDN works.
- Configuring Amazon CloudFront.
- Securing an S3 bucket using Origin Access Control.
- Understanding HTTPS and secure content delivery.
- Updating cached website files using CloudFront invalidation.
- Monitoring CloudFront metrics using Amazon CloudWatch.

This project helped me understand how different AWS services work together to host and deliver a website.

## 10. Future Improvements

Some improvements I would like to explore in the future:

- Connecting a custom domain.
- Setting up automated deployment using GitHub.
- Adding more CloudWatch monitoring and alarms.
- Improving website features and accessibility.

---

**Project developed by Joy Arnold J**

*B.Tech – Computer Science and Engineering (Applied AI)*  
*St. Joseph's University (Integrated with Kalvium)*