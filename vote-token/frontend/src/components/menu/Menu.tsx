import './menu.scss';
import { useWeb3React } from '@web3-react/core';

type MenuType = {
  menuOpen: boolean;
  setMenuOpen(flag: boolean): void;
};

export default function Menu({ menuOpen, setMenuOpen }: MenuType) {
  const { account } = useWeb3React();
  return (
    <div className={'sidebar ' + (menuOpen && 'active')}>
      <ul>
        <li className={window.location.href.includes('nft') ? '' : 'active'}
          onClick={() => setMenuOpen(false)}>
          <a href="/home">
            TOKEN
          </a>
        </li>
        <li className={window.location.href.includes('nft') ? 'active' : ''}
          onClick={() => setMenuOpen(false)}>
          <a href="https://nft.pollbox.org/home">
            NFT
          </a>
        </li>
        {/* {
          account &&
          <li
            onClick={() => setMenuOpen(false)}
            className={`active`}
          >
            <a href="/create_space">
              Create Box
            </a>
          </li>
        } */}
      </ul>
    </div>
  );
}
