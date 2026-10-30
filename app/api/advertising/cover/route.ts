import {NextResponse} from 'next/server';
import {getAdvertisers} from '@/lib/advertisers';
import {getSupportPhotos} from '@/lib/support-photos';
export const dynamic='force-dynamic';
export async function GET(){const [advertisers,photos]=await Promise.all([getAdvertisers(),getSupportPhotos()]);return NextResponse.json({advertisers,photo:photos[0]?.src||''},{headers:{'Cache-Control':'private, no-store'}});}
