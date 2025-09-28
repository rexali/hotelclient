import { Room } from "../types";

  export const handleShare = (room: Room) => {
    if (navigator.share) {
      navigator.share({
        title: room.name,
        text: `Check out this room: ${room.name}`,
        url: `${window.location.origin}/rooms/${room.id}`
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/rooms/${room.id}`);
      alert('Room link copied to clipboard!');
    }
  };
