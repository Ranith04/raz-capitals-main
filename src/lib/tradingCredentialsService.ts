/**
 * Service to send trading credentials via email using external API
 * This service now uses the standard email service format
 */

import { sendTradingCredentialsEmail } from './emailService';

export interface TradingCredentialsResponse {
  success: boolean;
  data?: any;
  error?: string;
  statusCode?: number;
}

export class TradingCredentialsService {
  /**
   * Send trading credentials to user's email via external API
   * @param emailId - User's email address
   * @param tradingId - Generated trading ID
   * @param tradingPassword - Generated trading password
   * @param userName - User's name (optional, defaults to "Valued Customer")
   * @returns Promise with API response
   */
  static async sendTradingCredentials(
    emailId: string,
    tradingId: string,
    tradingPassword: string,
    userName: string = 'Valued Customer'
  ): Promise<TradingCredentialsResponse> {
    try {
      console.log('📧 Sending trading credentials to email:', {
        emailID: emailId,
        tradingID: tradingId,
        tradingPassword: '***' // Don't log password
      });

      const success = await sendTradingCredentialsEmail(
        emailId,
        userName,
        tradingId,
        tradingPassword
      );

      if (success) {
        console.log('✅ Trading credentials email sent successfully');
        return {
          success: true,
          data: { message: 'Email sent successfully' },
        };
      } else {
        console.error('❌ Failed to send trading credentials email');
        return {
          success: false,
          error: 'Failed to send trading credentials email',
        };
      }
    } catch (error) {
      console.error('❌ Network error sending trading credentials:', error);
      return {
        success: false,
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }
}

