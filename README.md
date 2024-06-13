# Blackjack

This is a simple implementation of the popular card game Blackjack made purely from HTLM, CSS, Bootstrap and vanilla Javascript.

## Known Issues

- Selecting restart prior to card images being loaded can sometimes not trigger the remove method for clearing previous card images
- Function call to restart game state will sometimes not get called after consecutive hands (tested after 4th/5th hand)

## Tasks

- Implement split and double down function
- Add more reponsiveness for larger selection of screen sizes and devices
- Implement function to automatically end turn if player bust over 21
