import * as MailComposer from 'expo-mail-composer';
import * as FileSystem from 'expo-file-system';

export const sendTestResultEmail = async (employeeData, testScores) => {
  try {
    // Check email availability
    const isAvailable = await MailComposer.isAvailableAsync();
    if (!isAvailable) {
      throw new Error('Email service not available');
    }

    // Generate CSV content
    const csvContent = generateCSVContent(employeeData, testScores);
    
    // Save CSV to a temporary file
    const fileUri = `${FileSystem.cacheDirectory}test_results.csv`;
    await FileSystem.writeAsStringAsync(fileUri, csvContent);

    // Compose and send email
    await MailComposer.composeAsync({
      recipients: [], // Optional: Add default recipient if needed
      subject: `Defect Test Results - ${employeeData.name}`,
      body: createEmailBody(employeeData, testScores),
      attachments: [fileUri]
    });

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

const generateCSVContent = (employeeData, testScores) => {
  const header = 'Name,Employee Code,Test Date,Machine Defect Score,Casting Defect Score,Paint Defect Score,Total Score\n';
  const totalScore = testScores.machineDefect + testScores.castingDefect + testScores.paintDefect;
  const data = `${employeeData.name},${employeeData.employeeCode},${employeeData.testDate.toISOString().split('T')[0]},${testScores.machineDefect},${testScores.castingDefect},${testScores.paintDefect},${totalScore}`;
  return header + data;
};

const createEmailBody = (employeeData, testScores) => {
  const totalScore = testScores.machineDefect + testScores.castingDefect + testScores.paintDefect;
  return `
Defect Test Results

Employee Details:
Name: ${employeeData.name}
Employee Code: ${employeeData.employeeCode}
Test Date: ${employeeData.testDate.toDateString()}

Test Scores:
- Machine Defect Test: ${testScores.machineDefect}
- Casting Defect Test: ${testScores.castingDefect}
- Paint Defect Test: ${testScores.paintDefect}

Total Score: ${totalScore}

Please find the detailed CSV report attached.
  `;
};