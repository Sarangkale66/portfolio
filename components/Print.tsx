'use client';

import { RefObject, useEffect } from 'react';
import { useTheme } from './ContextAPI';

export function Print({ targetRef, headerRef, iconRef }: { targetRef: RefObject<null | HTMLDivElement>; headerRef: RefObject<null | HTMLDivElement>; iconRef: RefObject<null | HTMLDivElement> }) {
  const { LoadingScreenDown } = useTheme();

  // async function ImageInserter() {
  //   // const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.medium-zoom-image');
  //   // images.forEach((image: HTMLImageElement) => {
  //   //   if (image.parentElement && image.parentElement.parentElement && image.parentElement.parentElement.parentElement && image.parentElement.parentElement.parentElement.parentElement) {
  //   //     image.parentElement.parentElement.parentElement.parentElement.style.backgroundColor = "#191919";
  //   //     console.log(image.parentElement.parentElement.parentElement);

  //   //   }
  //   // })

  //   //   if (images.length !== 0)
  //   //     images.forEach((img, i) => {
  //   //       const wrapper = img.parentElement;
  //   //       if (!wrapper || wrapper.querySelector('.skeleton-loader')) return;

  //   //       wrapper.style.position = 'relative';
  //   //       wrapper.style.minHeight = '25vh';
  //   //       wrapper.style.width = '100%';

  //   //       img.style.opacity = '0';
  //   //       img.style.transition = 'opacity 0.5s ease-in';

  //   //       img.src = arr[i];

  //   //       const skeleton = document.createElement('div');
  //   //       skeleton.className =
  //   //         'skeleton-loader absolute top-0 left-0 w-full h-full z-10 animate-pulse flex items-center justify-center bg-gray-300 dark:bg-gray-700';

  //   //       skeleton.innerHTML = `
  //   //         <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
  //   //           <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
  //   //         </svg>
  //   //       `;
  //   //       wrapper.appendChild(skeleton);

  //   //       const onLoad = () => {
  //   //         img.style.opacity = '1';
  //   //         setTimeout(() => {
  //   //           skeleton.remove();
  //   //         }, 100);
  //   //       };

  //   //       if (img.complete) {
  //   //         onLoad();
  //   //       } else {
  //   //         img.onload = onLoad;
  //   //         img.onerror = () => {
  //   //           skeleton.innerHTML = `<span class="text-red-500 text-sm">Failed to load</span>`;
  //   //         };
  //   //       }

  //   //     });

  // }

  useEffect(() => {
    // ImageInserter();

    document.querySelectorAll('details').forEach((e) => (e.open = true));

    const table = document.querySelector('.notion-simple-table') as HTMLTableElement;

    if (table) {
      table.style.overflowX = "auto";
      table.style.border = '0.1px solid #ccc';
      table.style.margin = "10px 0px"
    }

    document.querySelectorAll('header').forEach((e) => {
      e.style.display = 'none';
    });

    document.querySelectorAll('main').forEach((e) => {
      e.style.padding = '0px';
      e.style.margin = '0px';
    });

    const body = document.querySelector("body") as HTMLBodyElement;
    if (body) body.style.overflowX = "hidden";

    const links = document.querySelectorAll(".notion-page-link") as NodeListOf<HTMLAnchorElement>;
    if (links) {
      links.forEach((link) => {
        if (link) {
          link.style.margin = "0px 0px 5px 0px";
          link.style.textDecoration = "none";
          link.style.fontSize = "1rem";
          link.style.fontWeight = "1rem"
          link.style.color = "gray";
          link.style.color = "#ccc"
          link.style.paddingLeft = "10px"
          const txt = link.querySelector(".notion-page-title-text") as HTMLSpanElement;
          if (txt) txt?.classList.add("shiny-text")
          const clone = link.cloneNode(true);
          targetRef.current?.appendChild(clone);
          link.remove();
        }
      })
    }

    const icons: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.notion-page-title-icon path');
    icons.forEach(icon => {
      icon?.setAttribute("fill", "#aaa");
    });


    const BgPage = document.querySelector(".notion-app") as HTMLDivElement;
    if (BgPage) {
      BgPage.style.background = "#191919";
      BgPage.style.color = "rgb(188 188 188)";
    }

    const BgPage2 = document.querySelector(".notion-page") as HTMLDivElement;
    if (BgPage2) {
      BgPage2.style.padding = "0px 5vh";
      BgPage2.style.fontSize = "19px";
      BgPage2.style.color = "rgb(188 188 188)";
      BgPage2.style.fontWeight = "600";
      BgPage2.style.fontFamily = "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Helvetica, Apple Color Emoji, Arial, sans-serif, Segoe UI Emoji, Segoe UI Symbol";
    }

    const CodeBlock = document.querySelectorAll(".notion-code-copy-button") as NodeListOf<HTMLPreElement>;
    if (CodeBlock) {
      CodeBlock.forEach(block => {
        if (block) block.style.display = "none";
      });
    }

    const informative = document.querySelector('.notion-collection-page-properties') as HTMLDivElement;
    if (informative) {
      informative.style.color = "color: rgb(188, 188, 188)"
      informative.style.padding = "0 10px"
      const copy = informative.cloneNode(true);
      headerRef.current?.appendChild(copy);
      informative.remove();
    }

    const createdElem = document.querySelectorAll('.notion-collection-column-title-icon path') as NodeListOf<SVGElement>;
    if (createdElem) {
      createdElem.forEach(elem => {
        elem?.setAttribute('fill', 'white');
      })
    }

    const icon1 = document.querySelector(".notion-page-icon-hero") as HTMLDivElement;

    if (icon1) {
      icon1.style.position = "relative"
      const clone = icon1.cloneNode(true);
      iconRef.current?.appendChild(clone);
      icon1.remove();
    }

    LoadingScreenDown();
  }, []);

  return null;
}