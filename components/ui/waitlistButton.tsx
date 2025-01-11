'use client'

interface WaitlistButtonProps {
  assetId: string;
}

export default function WaitlistButton({ assetId }: WaitlistButtonProps) {
  const handleJoinWaitlist = async () => {
    // TODO: Implement waitlist registration logic
    try {
      // Make API call to your backend
      console.log('Joining waitlist for asset:', assetId);
    } catch (error) {
      console.error('Error joining waitlist:', error);
    }
  };

  return (
    <button
      onClick={handleJoinWaitlist}
      className="mt-4 bg-[#008CFF] hover:bg-[#0070CC] text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
      </svg>
      Join Waitlist
    </button>
  );
} 