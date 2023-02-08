export const NAV_BAR_PAGES = [
    {id: 1, title: 'petition', href: '#petition'}, 
    {id: 2, title: 'cash machine', href: '#cash_machine'},
    {id: 3, title: 'connect wallet', href: '#connect_wallet'},
    {id: 4, title: 'safe', href: '#safe'},
    {id: 5, title: 'description', href: '#description'}
]

export const DESCRIPTION = [
    {id: 0, title: 'Whitelist', text: 'A user connects the wallet and pushes the button “participate”. The smart-contract adds his public key to the list in the system when a gas fee is paid.'},
    {id: 1, title: 'Petition', text: 'A user can also sign the petition. The process is same to the previous one but this time the user’s public key is added to the list of “signs” which is shown on the page.'},
    {id: 2, title: 'Safe', text: 'A user can add his tokens to the smart-contract which locks them for a week. When one does it, a timer appears and shows the days countdown. After the timer finishes, the user will be able to get his money back.'},
    {id: 3, title: 'Cash Machine', text: 'A user is able to exchange his tokens to USDT at a fixed rate. The smart-contract simply takes person’s tokens and gives him a respective amount of USDT. (Optional: by clicking the exchange button one opens a window where he can only set the amount of tokens to swap and then see the respective USDT amount)'},
]