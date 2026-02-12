import svgPaths from "./svg-yagvgytx3u";

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1a1dc120} id="Vector" stroke="var(--stroke-0, #023BAC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SlotClone() {
  return (
    <div className="bg-[#d2e1f8] relative rounded-[10px] shrink-0 size-[44px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_4px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[4px] pr-0 py-0 relative size-[44px]">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p9c60400} id="Vector" stroke="var(--stroke-0, #AFC9FE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2bf8f980} id="Vector_2" stroke="var(--stroke-0, #AFC9FE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SlotClone1() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[44px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_4px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-[4px] pr-0 py-0 relative size-[44px]">
        <Icon1 />
      </div>
    </div>
  );
}

export default function AgrupadorDeCanalas() {
  return (
    <div className="bg-[#f1f6ff] box-border content-stretch flex flex-col gap-[8px] items-center pb-[725px] pt-[16px] px-0 relative size-full" data-name="Agrupador de canalas">
      <SlotClone />
      <SlotClone1 />
    </div>
  );
}