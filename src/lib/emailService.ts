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
              <div style="background-color: #FFD700; border: 2px solid #FFA500; padding: 25px; border-radius: 8px; margin: 30px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h3 style="color: #0A2E1D; margin-top: 0; margin-bottom: 15px; font-size: 20px; font-weight: bold;">
                  💰 Want to add funds to your account?
                </h3>
                <p style="color: #0A2E1D; font-size: 16px; line-height: 1.6; margin: 10px 0; font-weight: 500;">
                  Contact our support team at <a href="mailto:support@razcaps.com" style="color: #0A2E1D; text-decoration: underline; font-weight: bold;">support@razcaps.com</a> with all your details.
                </p>
                <p style="color: #0A2E1D; font-size: 14px; line-height: 1.5; margin: 10px 0 0 0;">
                  Our team will guide you through the deposit process and answer any questions you may have.
                </p>
              </div>
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

/**
 * Generate HTML email template for Trading Credentials
 */
export function getTradingCredentialsEmailTemplate(
  userName: string,
  tradingId: string,
  tradingPassword: string
): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trading Credentials - RAZ CAPITALS</title>
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
              <h2 style="color: #0A2E1D; margin-top: 0; font-size: 24px;">Your Trading Account Credentials</h2>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Dear ${userName},
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Your trading account has been successfully created! Please find your login credentials below. Keep these credentials secure and do not share them with anyone.
              </p>
              <div style="background-color: #f8f9fa; border: 2px solid #0A2E1D; padding: 25px; border-radius: 8px; margin: 30px 0;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; color: #0A2E1D; font-size: 16px; font-weight: bold;">
                      Trading ID:
                    </td>
                    <td style="padding: 12px 0; color: #333333; font-size: 18px; font-family: monospace; font-weight: bold;">
                      ${tradingId}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #0A2E1D; font-size: 16px; font-weight: bold;">
                      Trading Password:
                    </td>
                    <td style="padding: 12px 0; color: #333333; font-size: 18px; font-family: monospace; font-weight: bold;">
                      ${tradingPassword}
                    </td>
                  </tr>
                </table>
              </div>
              <div style="background-color: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="color: #856404; font-size: 16px; margin: 0; font-weight: bold;">
                  ⚠️ Important Security Notice
                </p>
                <ul style="color: #856404; font-size: 14px; line-height: 1.8; margin: 15px 0 0 0; padding-left: 20px;">
                  <li>Never share your trading credentials with anyone</li>
                  <li>RAZ CAPITALS staff will never ask for your password</li>
                  <li>Change your password regularly for better security</li>
                  <li>Use these credentials to login to your trading account</li>
                </ul>
              </div>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                You can now:
              </p>
              <ul style="color: #333333; font-size: 16px; line-height: 1.8; margin: 20px 0; padding-left: 20px;">
                <li>Login to your trading account using these credentials</li>
                <li>Start trading once you have deposited funds</li>
                <li>Access all trading features and tools</li>
                <li>View your account balance and transaction history</li>
              </ul>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                If you have any questions or need assistance, please don't hesitate to contact our support team at <a href="mailto:support@razcaps.com" style="color: #0A2E1D; text-decoration: underline;">support@razcaps.com</a>.
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
 * Generate HTML email template for KYC rejection
 */
export function getKYCRejectionEmailTemplate(
  userName: string,
  rejectionReason?: string
): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KYC Verification Update - RAZ CAPITALS</title>
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
              <h2 style="color: #0A2E1D; margin-top: 0; font-size: 24px;">KYC Verification Update</h2>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Dear ${userName},
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                We regret to inform you that your Know Your Customer (KYC) verification documents require additional attention.
              </p>
              <div style="background-color: #f8d7da; border: 2px solid #dc3545; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="color: #721c24; font-size: 16px; margin: 0 0 15px 0; font-weight: bold;">
                  ⚠️ Action Required
                </p>
                ${rejectionReason ? `
                <p style="color: #721c24; font-size: 14px; line-height: 1.6; margin: 0;">
                  <strong>Reason:</strong> ${rejectionReason}
                </p>
                ` : `
                <p style="color: #721c24; font-size: 14px; line-height: 1.6; margin: 0;">
                  Please review your submitted documents and ensure they meet our verification requirements.
                </p>
                `}
              </div>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                To complete your verification, please:
              </p>
              <ul style="color: #333333; font-size: 16px; line-height: 1.8; margin: 20px 0; padding-left: 20px;">
                <li>Review the reason provided above</li>
                <li>Resubmit your documents with the necessary corrections</li>
                <li>Ensure all documents are clear, valid, and up-to-date</li>
                <li>Make sure all required information is complete</li>
              </ul>
              <div style="background-color: #d1ecf1; border: 2px solid #0c5460; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="color: #0c5460; font-size: 16px; margin: 0; font-weight: bold;">
                  💡 Need Help?
                </p>
                <p style="color: #0c5460; font-size: 14px; line-height: 1.6; margin: 10px 0 0 0;">
                  If you have any questions about the verification process or need assistance, please contact our support team at <a href="mailto:support@razcaps.com" style="color: #0c5460; text-decoration: underline; font-weight: bold;">support@razcaps.com</a>.
                </p>
              </div>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                We appreciate your patience and look forward to completing your verification.
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
 * Generate HTML email template for Deposit rejection
 */
export function getDepositRejectionEmailTemplate(
  userName: string,
  amount: number,
  currency: string,
  accountId: string,
  transactionId?: number,
  rejectionReason?: string
): string {
  const formattedAmount = `${amount.toFixed(2)} ${currency.toUpperCase()}`;
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deposit Request Update - RAZ CAPITALS</title>
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
              <h2 style="color: #0A2E1D; margin-top: 0; font-size: 24px;">Deposit Request Update</h2>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Dear ${userName},
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                We regret to inform you that your deposit request could not be processed at this time.
              </p>
              <div style="background-color: #f8d7da; border: 2px solid #dc3545; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #721c24; font-size: 16px;">
                      <strong>Amount:</strong> ${formattedAmount}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #721c24; font-size: 16px;">
                      <strong>Account ID:</strong> ${accountId}
                    </td>
                  </tr>
                  ${transactionId ? `
                  <tr>
                    <td style="padding: 8px 0; color: #721c24; font-size: 16px;">
                      <strong>Transaction ID:</strong> ${transactionId}
                    </td>
                  </tr>
                  ` : ''}
                  ${rejectionReason ? `
                  <tr>
                    <td style="padding: 8px 0; color: #721c24; font-size: 16px;">
                      <strong>Reason:</strong> ${rejectionReason}
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Please note:
              </p>
              <ul style="color: #333333; font-size: 16px; line-height: 1.8; margin: 20px 0; padding-left: 20px;">
                <li>Your account balance has not been affected</li>
                <li>No funds have been deducted from your account</li>
                <li>You may submit a new deposit request after addressing the issue</li>
              </ul>
              <div style="background-color: #d1ecf1; border: 2px solid #0c5460; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="color: #0c5460; font-size: 16px; margin: 0; font-weight: bold;">
                  💡 Need Assistance?
                </p>
                <p style="color: #0c5460; font-size: 14px; line-height: 1.6; margin: 10px 0 0 0;">
                  If you have any questions or need help with your deposit, please contact our support team at <a href="mailto:support@razcaps.com" style="color: #0c5460; text-decoration: underline; font-weight: bold;">support@razcaps.com</a>.
                </p>
              </div>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                We apologize for any inconvenience and appreciate your understanding.
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
 * Generate HTML email template for Withdrawal rejection
 */
export function getWithdrawalRejectionEmailTemplate(
  userName: string,
  amount: number,
  currency: string,
  accountId: string,
  transactionId?: number,
  rejectionReason?: string
): string {
  const formattedAmount = `${amount.toFixed(2)} ${currency.toUpperCase()}`;
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Withdrawal Request Update - RAZ CAPITALS</title>
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
              <h2 style="color: #0A2E1D; margin-top: 0; font-size: 24px;">Withdrawal Request Update</h2>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Dear ${userName},
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                We regret to inform you that your withdrawal request could not be processed at this time.
              </p>
              <div style="background-color: #f8d7da; border: 2px solid #dc3545; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #721c24; font-size: 16px;">
                      <strong>Amount:</strong> ${formattedAmount}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #721c24; font-size: 16px;">
                      <strong>Account ID:</strong> ${accountId}
                    </td>
                  </tr>
                  ${transactionId ? `
                  <tr>
                    <td style="padding: 8px 0; color: #721c24; font-size: 16px;">
                      <strong>Transaction ID:</strong> ${transactionId}
                    </td>
                  </tr>
                  ` : ''}
                  ${rejectionReason ? `
                  <tr>
                    <td style="padding: 8px 0; color: #721c24; font-size: 16px;">
                      <strong>Reason:</strong> ${rejectionReason}
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Please note:
              </p>
              <ul style="color: #333333; font-size: 16px; line-height: 1.8; margin: 20px 0; padding-left: 20px;">
                <li>Your account balance remains unchanged</li>
                <li>No funds have been deducted from your account</li>
                <li>You may submit a new withdrawal request after addressing the issue</li>
              </ul>
              <div style="background-color: #d1ecf1; border: 2px solid #0c5460; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="color: #0c5460; font-size: 16px; margin: 0; font-weight: bold;">
                  💡 Need Assistance?
                </p>
                <p style="color: #0c5460; font-size: 14px; line-height: 1.6; margin: 10px 0 0 0;">
                  If you have any questions or need help with your withdrawal, please contact our support team at <a href="mailto:support@razcaps.com" style="color: #0c5460; text-decoration: underline; font-weight: bold;">support@razcaps.com</a>.
                </p>
              </div>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                We apologize for any inconvenience and appreciate your understanding.
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
 * Convenience functions to send specific email types (continued)
 */

/**
 * Send Trading Credentials email
 */
export async function sendTradingCredentialsEmail(
  userEmail: string,
  userName: string,
  tradingId: string,
  tradingPassword: string
): Promise<boolean> {
  const html = getTradingCredentialsEmailTemplate(userName, tradingId, tradingPassword);
  const subject = 'Your Trading Account Credentials - RAZ CAPITALS';
  return await sendEmail(userEmail, subject, html);
}

/**
 * Send KYC rejection email
 */
export async function sendKYCRejectionEmail(
  userEmail: string,
  userName: string,
  rejectionReason?: string
): Promise<boolean> {
  const html = getKYCRejectionEmailTemplate(userName, rejectionReason);
  const subject = 'KYC Verification Update - RAZ CAPITALS';
  return await sendEmail(userEmail, subject, html);
}

/**
 * Send Deposit rejection email
 */
export async function sendDepositRejectionEmail(
  userEmail: string,
  userName: string,
  amount: number,
  currency: string,
  accountId: string,
  transactionId?: number,
  rejectionReason?: string
): Promise<boolean> {
  const html = getDepositRejectionEmailTemplate(userName, amount, currency, accountId, transactionId, rejectionReason);
  const subject = 'Deposit Request Update - RAZ CAPITALS';
  return await sendEmail(userEmail, subject, html);
}

/**
 * Send Withdrawal rejection email
 */
export async function sendWithdrawalRejectionEmail(
  userEmail: string,
  userName: string,
  amount: number,
  currency: string,
  accountId: string,
  transactionId?: number,
  rejectionReason?: string
): Promise<boolean> {
  const html = getWithdrawalRejectionEmailTemplate(userName, amount, currency, accountId, transactionId, rejectionReason);
  const subject = 'Withdrawal Request Update - RAZ CAPITALS';
  return await sendEmail(userEmail, subject, html);
}

