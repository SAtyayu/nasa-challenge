import { NextResponse } from 'next/server';
import optimalSettlements from '@/lib/optimal-settlement-data.json';

export async function GET() {
  return NextResponse.json(optimalSettlements);
}
