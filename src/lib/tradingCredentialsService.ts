/**
 * Service to send trading credentials via email using external API
 */

const BASE_URL = 'http://13.232.71.139:3000';
const ENDPOINT = '/http/trading-credentials';

export interface TradingCredentialsRequest {
  emailID: string;
  tradingID: string;
  tradingPassword: string;
}

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
   * @returns Promise with API response
   */
  static async sendTradingCredentials(
    emailId: string,
    tradingId: string,
    tradingPassword: string
  ): Promise<TradingCredentialsResponse> {
    try {
      const url = `${BASE_URL}${ENDPOINT}`;
      
      const requestBody: TradingCredentialsRequest = {
        emailID: emailId,
        tradingID: tradingId,
        tradingPassword: tradingPassword,
      };

      console.log('📧 Sending trading credentials to API:', {
        url,
        emailID: emailId,
        tradingID: tradingId,
        tradingPassword: '***' // Don't log password
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        console.log('✅ Trading credentials sent successfully:', responseData);
        return {
          success: true,
          data: responseData,
        };
      } else {
        console.error('❌ Trading credentials API error:', {
          status: response.status,
          data: responseData,
        });
        return {
          success: false,
          error: responseData.message || 'Failed to send trading credentials',
          statusCode: response.status,
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

