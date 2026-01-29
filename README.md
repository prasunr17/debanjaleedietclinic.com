# 🥗 Debanjalee Diet Clinic Website

A modern, professional website for Debanjalee Diet Clinic featuring online booking with WhatsApp integration and Google Sheets data storage.

## ✨ Features

- **Modern & Responsive Design** - Beautiful UI with CSS3 animations and effects
- **WhatsApp Booking** - Instant booking confirmation via WhatsApp
- **Google Sheets Integration** - All bookings automatically saved to Google Sheets
- **No Database Required** - Completely serverless solution
- **Mobile-Friendly** - Fully responsive design for all devices
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Smooth Animations** - Premium user experience with CSS3 transitions
- **Form Validation** - Client-side validation for better UX

## 🚀 Quick Start

### 1. Setup Files

All files are ready to use:
- `index.html` - Main website file
- `style.css` - Styling with modern CSS3
- `script.js` - JavaScript functionality
- `google-apps-script.gs` - Google Sheets integration script

### 2. Setup Google Sheets Integration (Optional but Recommended)

#### Step-by-Step Instructions:

1. **Create a Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new blank spreadsheet
   - Name it "Debanjalee Diet Clinic Bookings"

2. **Open Apps Script Editor**
   - In your Google Sheet, click `Extensions` > `Apps Script`
   - Delete any existing code in the editor

3. **Add the Script**
   - Copy all the code from `google-apps-script.gs`
   - Paste it into the Apps Script editor
   - Click the save icon (💾)

4. **Deploy as Web App**
   - Click the `Deploy` button (top right)
   - Select `New deployment`
   - Click the gear icon ⚙️ next to "Select type"
   - Choose `Web app`
   - Fill in the details:
     - **Description**: "Booking Form Handler"
     - **Execute as**: "Me"
     - **Who has access**: "Anyone"
   - Click `Deploy`

5. **Authorize the Script**
   - Click `Authorize access`
   - Choose your Google account
   - Click `Advanced` > `Go to [Project Name] (unsafe)`
   - Click `Allow`

6. **Copy the Web App URL**
   - After deployment, you'll see a Web App URL
   - Copy this URL (it looks like: `https://script.google.com/macros/s/...`)

7. **Update Your Website**
   - Open `script.js`
   - Find line 3: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
   - Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your copied URL
   - Save the file

### 3. Enable Email Notifications (Optional)

To receive email notifications for new bookings:

1. Open `google-apps-script.gs` in the Apps Script editor
2. Find the `sendEmailNotification` function
3. Replace `'your-email@example.com'` with your actual email
4. Uncomment the line: `// MailApp.sendEmail(emailAddress, subject, body);`
5. Save and redeploy

### 4. Test Your Website

1. **Open the Website**
   - Double-click `index.html` to open in your browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

2. **Test the Booking Form**
   - Fill out the booking form
   - Submit it
   - Check your Google Sheet for the new entry
   - Verify WhatsApp opens with the booking details

## 📱 WhatsApp Integration

The website automatically sends booking details to WhatsApp number: **+91 84318 13216**

When a user submits the form:
1. Data is validated
2. Saved to Google Sheets (if configured)
3. WhatsApp opens with pre-filled booking message
4. User can send the message to confirm

## 🎨 Customization

### Change Colors

Edit `style.css` and modify the CSS variables:

```css
:root {
    --primary-hue: 145;        /* Change for different primary color */
    --primary-sat: 65%;        /* Saturation */
    --primary-light: 48%;      /* Lightness */
    --accent-hue: 280;         /* Accent color hue */
}
```

### Update Contact Information

Edit `index.html` and update:
- Phone number
- Address
- Clinic hours
- Email (if applicable)

### Modify Services

In `index.html`, find the Services section and add/remove service cards as needed.

## 📊 Google Sheets Structure

Your Google Sheet will automatically have these columns:

| Column | Description |
|--------|-------------|
| Timestamp | When the booking was made |
| Name | Patient's full name |
| Phone | Contact number |
| Age | Patient's age |
| Email | Email address (optional) |
| Preferred Date | Appointment date |
| Preferred Time | Appointment time slot |
| Service | Type of service requested |
| Message | Additional information |
| Status | Booking status (Pending/Confirmed/Cancelled/Completed) |

## 🔧 Advanced Features

### Update Booking Status

In your Google Sheet, you can manually update the Status column to:
- **Pending** (default)
- **Confirmed**
- **Cancelled**
- **Completed**

The status will be color-coded automatically.

### Create Dashboard

In the Apps Script editor, you can run the `createDashboard()` function to generate a summary dashboard with booking statistics.

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Go to Settings > Pages
4. Select main branch
5. Your site will be live at `https://yourusername.github.io/repo-name`

### Option 2: Netlify (Free)
1. Go to [Netlify](https://www.netlify.com)
2. Drag and drop your project folder
3. Your site will be live instantly

### Option 3: Vercel (Free)
1. Go to [Vercel](https://vercel.com)
2. Import your project
3. Deploy with one click

### Option 4: Traditional Web Hosting
Upload all files to your web hosting via FTP:
- index.html
- style.css
- script.js

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Privacy & Security

- No sensitive data is stored in the website code
- Google Sheets data is private to your Google account
- WhatsApp messages are sent directly from user's device
- Form validation prevents invalid submissions
- No cookies or tracking scripts

## 📞 Support

For any issues or questions:
- **Phone**: +91 84318 13216
- **Location**: JALAN MEDIHUT Ward 18, Nivedita Market, Siliguri

## 📝 License

This website is created for Debanjalee Diet Clinic. All rights reserved.

## 🎯 Future Enhancements

Potential features to add:
- [ ] Online payment integration
- [ ] Patient portal for tracking appointments
- [ ] SMS notifications
- [ ] Calendar integration
- [ ] Testimonials section
- [ ] Blog for nutrition tips
- [ ] Before/After gallery

## 🙏 Credits

- **Design & Development**: Professional web development
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Icons**: Emoji icons for cross-platform compatibility

---

Made with ❤️ for Debanjalee Diet Clinic
