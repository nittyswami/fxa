/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { useState } from 'react';
import { useClickOutsideEffect } from 'fxa-react/lib/hooks';
import { useEscKeydownEffect } from '../../lib/hooks';

// background images should come from the bento-menu-sprite.png,
// The basics have been added to the icon span in the ul, but
// the actual sprite img url should be added to fxa-react/configs/tailwind.js
// Then the main firefox logo and bento menu icon should be added,
// this is also located in the bento-menu-sprite.png

// There is also the question of metrics pings? Should this be filed
// as a separate issue?

export const BentoMenu = () => {
  const [isRevealed, setRevealed] = useState(false);
  const toggleRevealed = () => setRevealed(!isRevealed);
  const bentoMenuInsideRef = useClickOutsideEffect<HTMLDivElement>(setRevealed);
  useEscKeydownEffect(setRevealed);
  const dropDownId = 'drop-down-bento-menu';

  return (
    <>
      <div className="relative" ref={bentoMenuInsideRef}>
        <button
          onClick={toggleRevealed}
          data-testid="drop-down-bento-menu-toggle"
          title="Firefox Bento Menu"
          aria-expanded={isRevealed}
          aria-controls={dropDownId}
          className="rounded-full border-2 border-transparent hover:border-purple-500 focus:border-purple-500 focus:outline-none active:border-purple-700 transition-standard"
        >
          <p>bento icon here</p>
        </button>
        {isRevealed && (
          <div
            id={dropDownId}
            data-testid={dropDownId}
            className="drop-down-menu -left-52"
          >
            <div className="flex flex-wrap">
              <div className="flex w-full pt-4 pb-4 items-center flex-col">
                <div className="text-center p-8 pt-2 pb-2">
                  <p>ff icon here</p>
                  <h2>Firefox is tech that fights for your online privacy.</h2>
                </div>
                <div className="w-full">
                  <ul className="list-none">
                    <li className="pt-2 pb-2 pl-8 hover:bg-grey-100">
                      <a href="https://monitor.firefox.com/">
                        <span className="monitor-icon"></span>Firefox Monitor
                      </a>
                    </li>
                    <li className="pt-2 pb-2 pl-8 hover:bg-grey-100">
                      <a href="https://app.adjust.com/hr2n0yz?engagement_type=fallback_click&fallback=https%3A%2F%2Fgetpocket.com%2Ffirefox_learnmore%3Fsrc%3Dff_bento&fallback_lp=https%3A%2F%2Fapps.apple.com%2Fapp%2Fpocket-save-read-grow%2Fid309601447">
                        <span className="monitor-icon"></span>Pocket
                      </a>
                    </li>
                    <li className="pt-2 pb-2 pl-8 hover:bg-grey-100">
                      <a href="https://www.mozilla.org/firefox/new/?utm_source=${referringSiteURL}&utm_medium=referral&utm_campaign=bento&utm_content=desktop">
                        <span className="monitor-icon"></span>Firefox Browser
                        for Desktop
                      </a>
                    </li>
                    <li className="pt-2 pb-2 pl-8 hover:bg-grey-100">
                      <a href="http://mozilla.org/firefox/mobile?utm_source=${referringSiteURL}&utm_medium=referral&utm_campaign=bento&utm_content=desktop">
                        <span className="monitor-icon"></span>Firefox Browser
                        for Mobile
                      </a>
                    </li>
                    <li className="pt-2 pb-2 pl-8 hover:bg-grey-100">
                      <a href="https://bhqf.adj.st/?adjust_t=6tteyjo&adj_deeplink=lockwise%3A%2F%2F&adj_fallback=https%3A%2F%2Fwww.mozilla.org%2Fen-US%2Ffirefox%2Flockwise">
                        <span className="monitor-icon"></span>Firefox Lockwise
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <a className="link-blue" href="">
                    Made by Mozilla
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BentoMenu;
