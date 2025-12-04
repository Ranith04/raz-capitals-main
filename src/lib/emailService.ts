/**
 * Email Service
 * Handles sending emails for various system events using the trading credentials API
 */

const EMAIL_API_ENDPOINT = 'http://13.232.71.139:3000/http/trading-credentials';

interface EmailRequest {
  emailID: string;
  subject: string;
  html: string;
}

/**
 * Send an email using the trading credentials API
 */
export async function sendEmail(emailID: string, subject: string, html: string): Promise<boolean> {
  try {
    const requestBody: EmailRequest = {
      emailID,
      subject,
      html
    };

    const response = await fetch(EMAIL_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Email API error:', response.status, errorText);
      return false;
    }

    console.log('Email sent successfully to:', emailID);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

/**
 * Email Templates
 */

/**
 * Generate HTML email template for KYC approval
 */
export function getKYCApprovalEmailTemplate(userName: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KYC Approval - RAZ CAPITALS</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0; text-align: center; background-color: #0A2E1D;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">RAZ CAPITALS</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #0A2E1D; margin-top: 0; font-size: 24px;">KYC Verification Approved</h2>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Dear ${userName},
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                We are pleased to inform you that your Know Your Customer (KYC) verification has been successfully approved.
              </p>
              <div style="background-color: #A0C8A9; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="color: #0A2E1D; font-size: 16px; margin: 0; font-weight: bold;">
                  ✓ Your account has been verified and you now have full access to all platform features.
                </p>
              </div>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                You can now:
              </p>
              <ul style="color: #333333; font-size: 16px; line-height: 1.8; margin: 20px 0; padding-left: 20px;">
                <li>Make deposits and withdrawals</li>
                <li>Access all trading features</li>
                <li>Enjoy full account privileges</li>
              </ul>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                If you have any questions or need assistance, please don't hesitate to contact our support team.
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Best regards,<br>
                <strong>RAZ CAPITALS Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #0A2E1D;">
        <p style="color: #ffffff; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} RAZ CAPITALS. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generate HTML email template for Deposit approval
 */
export function getDepositApprovalEmailTemplate(
  userName: string,
  amount: number,
  currency: string,
  accountId: string,
  transactionId?: number
): string {
  const formattedAmount = `${amount.toFixed(2)} ${currency.toUpperCase()}`;
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deposit Approved - RAZ CAPITALS</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0; text-align: center; background-color: #0A2E1D;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">RAZ CAPITALS</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #0A2E1D; margin-top: 0; font-size: 24px;">Deposit Approved</h2>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Dear ${userName},
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                We are pleased to inform you that your deposit request has been successfully approved and processed.
              </p>
              <div style="background-color: #A0C8A9; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #0A2E1D; font-size: 16px;">
                      <strong>Amount:</strong> ${formattedAmount}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #0A2E1D; font-size: 16px;">
                      <strong>Account ID:</strong> ${accountId}
                    </td>
                  </tr>
                  ${transactionId ? `
                  <tr>
                    <td style="padding: 8px 0; color: #0A2E1D; font-size: 16px;">
                      <strong>Transaction ID:</strong> ${transactionId}
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                The funds have been credited to your trading account and are now available for trading.
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                You can now:
              </p>
              <ul style="color: #333333; font-size: 16px; line-height: 1.8; margin: 20px 0; padding-left: 20px;">
                <li>Start trading immediately</li>
                <li>View your updated account balance</li>
                <li>Access all trading features</li>
              </ul>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                If you have any questions or need assistance, please don't hesitate to contact our support team.
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Best regards,<br>
                <strong>RAZ CAPITALS Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #0A2E1D;">
        <p style="color: #ffffff; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} RAZ CAPITALS. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generate HTML email template for Withdrawal approval
 */
export function getWithdrawalApprovalEmailTemplate(
  userName: string,
  amount: number,
  currency: string,
  accountId: string,
  transactionId?: number
): string {
  const formattedAmount = `${amount.toFixed(2)} ${currency.toUpperCase()}`;
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Withdrawal Approved - RAZ CAPITALS</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0; text-align: center; background-color: #0A2E1D;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">RAZ CAPITALS</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #0A2E1D; margin-top: 0; font-size: 24px;">Withdrawal Approved</h2>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Dear ${userName},
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                We are pleased to inform you that your withdrawal request has been successfully approved and processed.
              </p>
              <div style="background-color: #A0C8A9; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #0A2E1D; font-size: 16px;">
                      <strong>Amount:</strong> ${formattedAmount}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #0A2E1D; font-size: 16px;">
                      <strong>Account ID:</strong> ${accountId}
                    </td>
                  </tr>
                  ${transactionId ? `
                  <tr>
                    <td style="padding: 8px 0; color: #0A2E1D; font-size: 16px;">
                      <strong>Transaction ID:</strong> ${transactionId}
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                The funds have been processed and will be transferred to your registered withdrawal account according to your selected payment method.
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Please note:
              </p>
              <ul style="color: #333333; font-size: 16px; line-height: 1.8; margin: 20px 0; padding-left: 20px;">
                <li>Processing time may vary depending on your payment method</li>
                <li>You will receive a confirmation once the transfer is complete</li>
                <li>Your account balance has been updated accordingly</li>
              </ul>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                If you have any questions or need assistance, please don't hesitate to contact our support team.
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Best regards,<br>
                <strong>RAZ CAPITALS Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #0A2E1D;">
        <p style="color: #ffffff; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} RAZ CAPITALS. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Convenience functions to send specific email types
 */

/**
 * Send KYC approval email
 */
export async function sendKYCApprovalEmail(userEmail: string, userName: string): Promise<boolean> {
  const html = getKYCApprovalEmailTemplate(userName);
  const subject = 'KYC Verification Approved - RAZ CAPITALS';
  return await sendEmail(userEmail, subject, html);
}

/**
 * Send Deposit approval email
 */
export async function sendDepositApprovalEmail(
  userEmail: string,
  userName: string,
  amount: number,
  currency: string,
  accountId: string,
  transactionId?: number
): Promise<boolean> {
  const html = getDepositApprovalEmailTemplate(userName, amount, currency, accountId, transactionId);
  const subject = 'Deposit Approved - RAZ CAPITALS';
  return await sendEmail(userEmail, subject, html);
}

/**
 * Send Withdrawal approval email
 */
export async function sendWithdrawalApprovalEmail(
  userEmail: string,
  userName: string,
  amount: number,
  currency: string,
  accountId: string,
  transactionId?: number
): Promise<boolean> {
  const html = getWithdrawalApprovalEmailTemplate(userName, amount, currency, accountId, transactionId);
  const subject = 'Withdrawal Approved - RAZ CAPITALS';
  return await sendEmail(userEmail, subject, html);
}

