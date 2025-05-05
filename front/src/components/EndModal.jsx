
function EndModal({ open, answers }) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">🎉 Thanks for completing the form!</h2>
        <div className="text-left text-sm">
          {answers.map((a, idx) => (
            <p key={idx}>Answer {idx + 1}: {a}</p>
          ))}
        </div>
        <button
          onClick={() => location.reload()}
          className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        >
          Restart
        </button>   
      </div>
    </motion.div>
  );
}

export default EndModal;