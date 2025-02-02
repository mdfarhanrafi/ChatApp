const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-3 ${
            idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />

          <div className="flex flex-col space-y-1">
            {/* Name skeleton */}
            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />

            {/* Message bubble */}
            <div className="h-16 w-[200px] bg-gray-300 rounded-lg animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
