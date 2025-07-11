            └── blackjack/
                ├── blackjack.component.ts
                ├── blackjack.component.html
                ├── blackjack.component.scss

                ├── constants.ts                   # URL рубашки и другие общие константы

                ├── services/
                │   ├── deck.service.ts            # API взаимодействие с deckofcardsapi.com
                │   └── game-state.service.ts      # Централизованное состояние игры (playerCards, dealerCards)

                └── components/
                    ├── start-game-button/
                    │   ├── start-game-button.component.ts
                    │   ├── start-game-button.component.html
                    │   └── start-game-button.component.scss

                    ├── player-hand/
                    │   ├── player-hand.component.ts
                    │   ├── player-hand.component.html
                    │   └── player-hand.component.scss

                    ├── dealer-hand/
                    │   ├── dealer-hand.component.ts
                    │   ├── dealer-hand.component.html
                    │   └── dealer-hand.component.scss

                    └── card-back-stack/
                        ├── card-back-stack.component.ts
                        ├── card-back-stack.component.html
                        └── card-back-stack.component.scss
