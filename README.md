# Blackjack

This is part 1 of a series of casino games and a simple implementation of the popular card game Blackjack made purely from HTLM, CSS and vanila Javascript.

## Rules

The rules of the game are as follows:

1. The goal of the game is to have a hand value as close to 21 as possible without exceeding it.
2. Each player is dealt two cards initially.
3. Numbered cards are worth their face value, face cards (J, Q, K) are worth 10, and the Ace can be worth 1 or 11.
4. Players can choose to "hit" to receive another card or "stand" to keep their current hand.
5. If a player's hand value exceeds 21, they bust and lose the game.
6. After all players have made their moves, the dealer reveals their hand and hits until their hand value is 17 or higher.
7. If the dealer's hand value exceeds 21, all remaining players win. Otherwise, the dealer compares their hand value to each player's hand value and the highest value wins.

## Known Issues

- Selecting restart prior to card images being loaded can sometimes not trigger the remove method for clearing previous card images
- Function call to restart game state will sometimes not get called after consecutive hands (tested after 4th/5th hand)

## Tasks

- Implement split and double down function
- Add more reponsiveness for larger selection of screen sizes and devices
- Implement function to automatically end turn if player bust over 21
