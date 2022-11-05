// ============= Reading Time Calculation =============

const getReadingTime = (text) => {
  const wpm = 220;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);

  if (time === 1) {
    return `${time} minute`;
  }

  return `${time} minutes`;
};

// ====================================================

module.exports = { getReadingTime };

// ====================================================
