import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, data, level = 'info' } = await request.json();
    
    // Log to server console (this will show in the terminal)
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    switch (level) {
      case 'error':
        console.error(logMessage, data);
        break;
      case 'warn':
        console.warn(logMessage, data);
        break;
      case 'info':
      default:
        console.log(logMessage, data);
        break;
    }
    
    return NextResponse.json({ success: true, message: 'Logged successfully' });
  } catch (error) {
    console.error('Error in log API:', error);
    return NextResponse.json({ success: false, error: 'Failed to log' }, { status: 500 });
  }
}
