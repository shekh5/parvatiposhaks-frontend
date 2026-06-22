import { LocalShipping, VerifiedUser, HeadsetMic } from '@mui/icons-material';

export const TrustBanner = () => {
  return (
    <div className="bg-brand-blue py-10 border-t-4 border-b-4 border-brand-gold">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
          <div className="flex flex-col items-center justify-center space-y-3 transform transition hover:-translate-y-1">
            <LocalShipping sx={{ fontSize: 48 }} className="text-brand-gold" />
            <h4 className="font-semibold text-xl font-serif tracking-wide">Free Express Shipping</h4>
            <p className="text-sm text-brand-light/80 font-light">On all orders over ₹1999</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3 transform transition hover:-translate-y-1">
            <VerifiedUser sx={{ fontSize: 48 }} className="text-brand-gold" />
            <h4 className="font-semibold text-xl font-serif tracking-wide">100% Authentic Quality</h4>
            <p className="text-sm text-brand-light/80 font-light">Premium traditional fabrics</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3 transform transition hover:-translate-y-1">
            <HeadsetMic sx={{ fontSize: 48 }} className="text-brand-gold" />
            <h4 className="font-semibold text-xl font-serif tracking-wide">24/7 Dedicated Support</h4>
            <p className="text-sm text-brand-light/80 font-light">Always here for your styling needs</p>
          </div>
        </div>
      </div>
    </div>
  );
};
