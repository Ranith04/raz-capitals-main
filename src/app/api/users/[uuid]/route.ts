import { UserService } from '@/lib/userService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = params;
    
    if (!uuid) {
      return NextResponse.json(
        { error: 'User UUID is required' },
        { status: 400 }
      );
    }

    console.log('Fetching user data for UUID:', uuid);
    
    const userData = await UserService.getUserByUuid(uuid);
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
