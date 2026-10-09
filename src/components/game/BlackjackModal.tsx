'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, Trophy, RotateCcw } from 'lucide-react';

export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type Rank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'jack'
  | 'queen'
  | 'king'
  | 'ace';

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  image: string;
}

const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS: Rank[] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
  'ace',
];

const CARD_BACK_IMAGE = '/card_pngs/card_backs/card_back_1.png';

// Rule: Ace = 11, Face = 10, Numbers = value
export function getCardValue(rank: Rank): number {
  if (rank === 'ace') return 11;
  if (rank === 'jack' || rank === 'queen' || rank === 'king') return 10;
  return parseInt(rank, 10);
}

export function calculateHandScore(cards: Card[]): number {
  return cards.reduce((sum, c) => sum + getCardValue(c.rank), 0);
}

function createShuffledDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${rank}_of_${suit}_${Math.random().toString(36).substring(2, 7)}`,
        suit,
        rank,
        image: `/card_pngs/card_faces/${rank}_of_${suit}.png`,
      });
    }
  }

  // Fisher-Yates Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

interface BlackjackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BlackjackModal({ isOpen, onClose }: BlackjackModalProps) {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [isDealerHoleCardRevealed, setIsDealerHoleCardRevealed] = useState(false);
  const [gameStatus, setGameStatus] = useState<
    'playing' | 'player_bust' | 'dealer_bust' | 'player_win' | 'dealer_win' | 'push' | 'blackjack'
  >('playing');
  const [scoreBoard, setScoreBoard] = useState({ wins: 0, losses: 0, pushes: 0 });

  // Escape key listener to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Deal a new round
  const startNewGame = useCallback(() => {
    const newDeck = createShuffledDeck();
    const p1 = newDeck.pop()!;
    const d1 = newDeck.pop()!;
    const p2 = newDeck.pop()!;
    const d2 = newDeck.pop()!; // Hole card (face-down initially)

    const initialPlayer = [p1, p2];
    const initialDealer = [d1, d2];

    setDeck(newDeck);
    setPlayerCards(initialPlayer);
    setDealerCards(initialDealer);
    setIsDealerHoleCardRevealed(false);

    const pScore = calculateHandScore(initialPlayer);
    const dScore = calculateHandScore(initialDealer);

    if (pScore === 21 && dScore === 21) {
      setIsDealerHoleCardRevealed(true);
      setGameStatus('push');
      setScoreBoard((s) => ({ ...s, pushes: s.pushes + 1 }));
    } else if (pScore === 21) {
      setIsDealerHoleCardRevealed(true);
      setGameStatus('blackjack');
      setScoreBoard((s) => ({ ...s, wins: s.wins + 1 }));
    } else {
      setGameStatus('playing');
    }
  }, []);

  // Initialize game on open
  useEffect(() => {
    if (isOpen) {
      startNewGame();
    }
  }, [isOpen, startNewGame]);

  // Player action: HIT
  const handleHit = () => {
    if (gameStatus !== 'playing' || deck.length === 0) return;
    const currentDeck = [...deck];
    const newCard = currentDeck.pop()!;
    const nextPlayerCards = [...playerCards, newCard];

    setDeck(currentDeck);
    setPlayerCards(nextPlayerCards);

    const newScore = calculateHandScore(nextPlayerCards);
    if (newScore > 21) {
      // Player busts
      setIsDealerHoleCardRevealed(true);
      setGameStatus('player_bust');
      setScoreBoard((s) => ({ ...s, losses: s.losses + 1 }));
    }
  };

  // Player action: STAND -> Dealer's turn
  const handleStand = () => {
    if (gameStatus !== 'playing') return;
    setIsDealerHoleCardRevealed(true);

    let currentDealerCards = [...dealerCards];
    let currentDeck = [...deck];
    let dealerScore = calculateHandScore(currentDealerCards);

    // Dealer hits until >= 17
    while (dealerScore < 17 && currentDeck.length > 0) {
      const drawnCard = currentDeck.pop()!;
      currentDealerCards.push(drawnCard);
      dealerScore = calculateHandScore(currentDealerCards);
    }

    setDeck(currentDeck);
    setDealerCards(currentDealerCards);

    const playerScore = calculateHandScore(playerCards);

    if (dealerScore > 21) {
      setGameStatus('dealer_bust');
      setScoreBoard((s) => ({ ...s, wins: s.wins + 1 }));
    } else if (dealerScore > playerScore) {
      setGameStatus('dealer_win');
      setScoreBoard((s) => ({ ...s, losses: s.losses + 1 }));
    } else if (playerScore > dealerScore) {
      setGameStatus('player_win');
      setScoreBoard((s) => ({ ...s, wins: s.wins + 1 }));
    } else {
      setGameStatus('push');
      setScoreBoard((s) => ({ ...s, pushes: s.pushes + 1 }));
    }
  };

  const playerScore = calculateHandScore(playerCards);
  const dealerScore = isDealerHoleCardRevealed
    ? calculateHandScore(dealerCards)
    : dealerCards.length > 0
    ? getCardValue(dealerCards[0].rank)
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] bg-[#141414] text-white border border-white/15 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/30">
              <div className="flex items-center gap-3">
                <span className="text-base sm:text-lg">♠</span>
                <div>
                  <h3 className="text-sm font-bold tracking-wider uppercase font-mono">
                    BLACKJACK
                  </h3>
                  <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
                    ACE = 11 · DEALER STANDS 17
                  </span>
                </div>
              </div>

              {/* Scoreboard pill & Close Button */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono">
                  <span className="text-emerald-400 font-bold">{scoreBoard.wins}W</span>
                  <span className="text-white/40">/</span>
                  <span className="text-rose-400 font-bold">{scoreBoard.losses}L</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/60">{scoreBoard.pushes}D</span>
                </div>

                <button
                  onClick={onClose}
                  type="button"
                  aria-label="Close game"
                  className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table Game Area */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-5 flex flex-col justify-between min-h-[380px] bg-gradient-to-b from-[#18181B] to-[#09090B]">
              {/* DEALER AREA */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/60 uppercase tracking-widest">
                    DEALER&apos;S HAND
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-bold">
                    {isDealerHoleCardRevealed ? dealerScore : `${dealerScore} + ?`}
                  </span>
                </div>

                {/* Dealer Cards Row */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-h-[105px]">
                  {dealerCards.map((card, idx) => {
                    const isHidden = idx === 1 && !isDealerHoleCardRevealed;
                    return (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-16 sm:w-20 aspect-[1/1.4] rounded-lg overflow-hidden border border-white/15 shadow-md bg-white shrink-0"
                      >
                        <img
                          src={isHidden ? CARD_BACK_IMAGE : card.image}
                          alt={isHidden ? 'Card back' : `${card.rank} of ${card.suit}`}
                          className="w-full h-full object-contain bg-white"
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* CENTER STATUS BANNER */}
              <div className="py-1 text-center min-h-[44px] flex items-center justify-center">
                {gameStatus === 'playing' && (
                  <span className="text-xs font-mono tracking-widest text-white/60 uppercase animate-pulse">
                    YOUR TURN · HIT OR STAND?
                  </span>
                )}
                {gameStatus === 'blackjack' && (
                  <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase font-bold tracking-widest shadow-sm">
                    NATURAL BLACKJACK! YOU WIN!
                  </div>
                )}
                {gameStatus === 'player_win' && (
                  <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase font-bold tracking-widest shadow-sm">
                    YOU WIN!
                  </div>
                )}
                {gameStatus === 'dealer_bust' && (
                  <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase font-bold tracking-widest shadow-sm">
                    DEALER BUSTS! YOU WIN!
                  </div>
                )}
                {gameStatus === 'player_bust' && (
                  <div className="px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase font-bold tracking-widest shadow-sm">
                    BUST (OVER 21)! DEALER WINS.
                  </div>
                )}
                {gameStatus === 'dealer_win' && (
                  <div className="px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase font-bold tracking-widest shadow-sm">
                    DEALER WINS!
                  </div>
                )}
                {gameStatus === 'push' && (
                  <div className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase font-bold tracking-widest shadow-sm">
                    PUSH (TIE)!
                  </div>
                )}
              </div>

              {/* PLAYER AREA */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/60 uppercase tracking-widest">
                    YOUR HAND
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold font-mono text-xs ${
                      playerScore > 21
                        ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40'
                        : playerScore === 21
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    SCORE: {playerScore}
                  </span>
                </div>

                {/* Player Cards Row */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-h-[105px]">
                  {playerCards.map((card) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-16 sm:w-20 aspect-[1/1.4] rounded-lg overflow-hidden border border-white/20 shadow-md bg-white shrink-0 hover:scale-105 transition-transform"
                    >
                      <img
                        src={card.image}
                        alt={`${card.rank} of ${card.suit}`}
                        className="w-full h-full object-contain bg-white"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex items-center justify-between gap-3">
              {gameStatus === 'playing' ? (
                <>
                  <button
                    onClick={handleHit}
                    type="button"
                    className="flex-1 py-3 px-4 rounded-xl bg-white text-[#141414] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/90 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    HIT (+ CARD)
                  </button>
                  <button
                    onClick={handleStand}
                    type="button"
                    className="flex-1 py-3 px-4 rounded-xl bg-white/10 text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
                  >
                    STAND (STAY)
                  </button>
                </>
              ) : (
                <button
                  onClick={startNewGame}
                  type="button"
                  className="w-full py-3.5 px-4 rounded-xl bg-white text-[#141414] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>PLAY AGAIN / DEAL NEW HAND</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

