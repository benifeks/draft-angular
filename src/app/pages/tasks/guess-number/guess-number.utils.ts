export const generateSecretNumber = (): number =>
  Math.floor(Math.random() * 100) + 1;

export const handleGuess = (
  guess: string,
  secret: number,
  attempts: number,
  setAttempts: (v: number) => void,
  setResult: (v: string) => void,
  setGameOver: (v: boolean) => void
) => {
  const num = Number(guess);

  if (!num || num < 1 || num > 100) {
    setResult('Введите число от 1 до 100');
    return;
  }

  const remaining = attempts - 1;
  setAttempts(remaining); // ← гарантированно обновляем

  if (num === secret) {
    setResult('🎉 Правильно!');
    setGameOver(true);
    return;
  }

  if (remaining === 0) {
    setResult(`💀 Попытки закончились. Было число: ${secret}`);
    setGameOver(true);
  } else {
    const hint = num < secret ? '📉 Больше' : '📈 Меньше';
    setResult(`${hint}. Попробуйте снова`);
  }
};

export const resetGame = (
  setGuess: (v: string) => void,
  setResult: (v: string) => void,
  setSecret: (v: number) => void,
  setAttempts: (v: number) => void,
  setGameOver: (v: boolean) => void
) => {
  setGuess('');
  setResult('');
  setSecret(generateSecretNumber());
  setAttempts(5);
  setGameOver(false);
};
