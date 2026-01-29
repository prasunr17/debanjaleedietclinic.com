/**
 * Google Apps Script for Debanjalee Diet Clinic Booking System
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click on the "Deploy" button > "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as": "Me"
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web App URL and paste it in script.js as GOOGLE_SCRIPT_URL
 * 10. The first time you deploy, you'll need to authorize the script
 */

// Function to handle POST requests (form submissions)
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // If this is the first time, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Phone',
        'Age',
        'Email',
        'Preferred Date',
        'Preferred Time',
        'Service',
        'Message',
        'Status'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#10b981');
      headerRange.setFontColor('#ffffff');
    }
    
    // Add the new booking data
    sheet.appendRow([
      new Date(data.timestamp),
      data.name,
      data.phone,
      data.age,
      data.email,
      data.date,
      data.time,
      data.service,
      data.message,
      'Pending'
    ]);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 10);
    
    // Optional: Send email notification to clinic
    sendEmailNotification(data);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Booking saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to handle GET requests (for testing)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'success',
    'message': 'Debanjalee Diet Clinic Booking System is active!'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Optional: Send email notification when new booking is received
function sendEmailNotification(data) {
  try {
    // Replace with your email address
    const emailAddress = 'your-email@example.com';
    
    const subject = '🏥 New Appointment Booking - ' + data.name;
    
    const body = `
New appointment booking received:

👤 Name: ${data.name}
📞 Phone: ${data.phone}
🎂 Age: ${data.age}
📧 Email: ${data.email}

📅 Preferred Date: ${data.date}
🕐 Preferred Time: ${data.time}
🎯 Service: ${data.service}

💬 Additional Information:
${data.message}

---
Timestamp: ${new Date(data.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please contact the patient to confirm the appointment.
    `;
    
    // Uncomment the line below to enable email notifications
    // MailApp.sendEmail(emailAddress, subject, body);
    
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Optional: Function to get all bookings (for admin dashboard)
function getAllBookings() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Convert to JSON format
  const headers = data[0];
  const bookings = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const booking = {};
    
    for (let j = 0; j < headers.length; j++) {
      booking[headers[j]] = row[j];
    }
    
    bookings.push(booking);
  }
  
  return bookings;
}

// Optional: Function to update booking status
function updateBookingStatus(rowNumber, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const statusColumn = 10; // Column J (Status)
  
  sheet.getRange(rowNumber, statusColumn).setValue(status);
  
  // Add color coding based on status
  const cell = sheet.getRange(rowNumber, statusColumn);
  
  switch(status.toLowerCase()) {
    case 'confirmed':
      cell.setBackground('#10b981');
      cell.setFontColor('#ffffff');
      break;
    case 'cancelled':
      cell.setBackground('#ef4444');
      cell.setFontColor('#ffffff');
      break;
    case 'completed':
      cell.setBackground('#3b82f6');
      cell.setFontColor('#ffffff');
      break;
    default:
      cell.setBackground('#fbbf24');
      cell.setFontColor('#000000');
  }
}

// Optional: Function to create a summary dashboard
function createDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let dashboardSheet = ss.getSheetByName('Dashboard');
  
  // Create dashboard sheet if it doesn't exist
  if (!dashboardSheet) {
    dashboardSheet = ss.insertSheet('Dashboard');
  }
  
  const dataSheet = ss.getSheets()[0];
  const data = dataSheet.getDataRange().getValues();
  
  // Clear existing dashboard
  dashboardSheet.clear();
  
  // Add dashboard title
  dashboardSheet.getRange(1, 1).setValue('📊 Booking Dashboard');
  dashboardSheet.getRange(1, 1).setFontSize(18).setFontWeight('bold');
  
  // Calculate statistics
  const totalBookings = data.length - 1; // Exclude header
  
  // Count bookings by status
  const statusCounts = {};
  for (let i = 1; i < data.length; i++) {
    const status = data[i][9] || 'Pending';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  }
  
  // Display statistics
  let row = 3;
  dashboardSheet.getRange(row, 1).setValue('Total Bookings:');
  dashboardSheet.getRange(row, 2).setValue(totalBookings);
  
  row++;
  dashboardSheet.getRange(row, 1).setValue('Status Breakdown:');
  row++;
  
  for (const [status, count] of Object.entries(statusCounts)) {
    dashboardSheet.getRange(row, 2).setValue(status + ':');
    dashboardSheet.getRange(row, 3).setValue(count);
    row++;
  }
  
  // Auto-resize columns
  dashboardSheet.autoResizeColumns(1, 3);
}
