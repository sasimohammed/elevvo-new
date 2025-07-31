export default function StatusBadge({ status }) {
    const statusColors = {
        Applied: 'bg-blue-500',
        Interviewing: 'bg-purple-500',
        Offer: 'bg-green-500',
        Rejected: 'bg-red-500'
    };

    return (
        <span className={`${statusColors[status]} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
      {status}
    </span>
    );
}