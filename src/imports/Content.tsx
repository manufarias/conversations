import svgPaths from "./svg-opcjt5q5f3";

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[17px] items-start relative shrink-0 text-[#40435b]" data-name="Content">
      <p className="font-['Lato:Bold',_sans-serif] leading-[28px] not-italic relative shrink-0 text-[24px] text-nowrap whitespace-pre">Brand</p>
      <div className="font-['Lato:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[18px] relative shrink-0 text-[14px] w-[720px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        <p className="mb-0 whitespace-pre-wrap">{`Los colores se basan en el brandbook de Osana. Estos colores fueron  `}</p>
        <p>optimizados para una mejor accesibilidad y semántica.</p>
      </div>
    </div>
  );
}

function Color() {
  return (
    <div className="bg-[#1a66fc] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Primary</p>
      <p className="relative shrink-0 text-[#6b6f93]">#1A66FC</p>
    </div>
  );
}

function Primary() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="Primary">
      <Color />
      <Text />
    </div>
  );
}

function Color1() {
  return (
    <div className="bg-[#1dcca3] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Secondary</p>
      <p className="relative shrink-0 text-[#6b6f93]">#1DCCA3</p>
    </div>
  );
}

function Secondary() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="Secondary">
      <Color1 />
      <Text1 />
    </div>
  );
}

function Color2() {
  return <div className="bg-[#40435b] rounded-[4px] shrink-0 size-[60px]" data-name="Color" />;
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] text-center">Neutral</p>
      <p className="relative shrink-0 text-[#6b6f93]">#40435B</p>
    </div>
  );
}

function Neutral() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="Neutral">
      <Color2 />
      <Text2 />
    </div>
  );
}

function Color3() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] text-center">White</p>
      <p className="relative shrink-0 text-[#6b6f93]">#FFFFFF</p>
    </div>
  );
}

function White() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="White">
      <Color3 />
      <Text3 />
    </div>
  );
}

function Pallet() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Pallet">
      <Primary />
      <Secondary />
      <Neutral />
      <White />
    </div>
  );
}

function Brand() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start overflow-clip relative shrink-0 w-full" data-name="Brand">
      <Content />
      <Pallet />
    </div>
  );
}

function Divider() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Divider">
      <div className="absolute bottom-full left-0 right-0 top-0" data-name="Line">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 962 1">
            <path d="M0 0.5H962" id="Line" stroke="var(--stroke-0, #E0E1E9)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-[17px] items-start relative shrink-0 text-[#40435b] w-[500px]" data-name="Content">
      <p className="font-['Lato:Bold',_sans-serif] leading-[28px] not-italic relative shrink-0 text-[24px] text-nowrap whitespace-pre">Paleta de color</p>
      <div className="font-['Lato:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[18px] min-w-full relative shrink-0 text-[14px] w-[min-content]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        <p className="mb-0">El primario y el secundario tienen una paleta propia. Esto permite utilizar sus matices para representar diferentes estados.</p>
        <p className="mb-0"> </p>
        <p className="mb-0 whitespace-pre-wrap">{`Otros colores aparecen dentro de la paleta para diferentes escenarios, como  `}</p>
        <p>los semánticos.</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d={svgPaths.p35550b00} fill="var(--fill-0, #1A66FC)" id="circle-info" />
        </g>
      </svg>
    </div>
  );
}

function Alert() {
  return (
    <div className="bg-[#e8f0ff] relative rounded-[6px] shrink-0 w-full" data-name="Alert">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative w-full">
          <Icon />
          <div className="basis-0 flex flex-col font-['Lato:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#40435b] text-[0px]">
            <p className="leading-[20px] text-[16px]">
              <span>{`La paleta del color primario se construirá a partir del color principal que nos brinde la Institución, tomando como base el Primary 600. `}</span>
              <span className="font-['Lato:Regular',_sans-serif] not-italic">Plugin</span>
              <span>{` Figma`}</span>
              <span className="font-['Lato:Regular',_sans-serif] not-italic">{`: `}</span>
              <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid font-['Lato:Regular',_sans-serif] not-italic underline" href="https://www.figma.com/community/plugin/739475857305927370/Color-Designer">
                <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[20px] text-[16px]" href="https://www.figma.com/community/plugin/739475857305927370/Color-Designer">
                  Color Designer
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c6d9fe] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Color4() {
  return <div className="bg-[#023bac] rounded-[4px] shrink-0 size-[60px]" data-name="Color" />;
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Primary 800</p>
      <p className="relative shrink-0 text-[#6b6f93]">#023BAC</p>
    </div>
  );
}

function Component800() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="800">
      <Color4 />
      <Text4 />
    </div>
  );
}

function Color5() {
  return <div className="bg-[#0347ce] rounded-[4px] shrink-0 size-[60px]" data-name="Color" />;
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Primary 700</p>
      <p className="relative shrink-0 text-[#6b6f93]">#0347CE</p>
    </div>
  );
}

function Component700() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="700">
      <Color5 />
      <Text5 />
    </div>
  );
}

function Color6() {
  return (
    <div className="bg-[#1a66fc] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Primary 600</p>
      <p className="relative shrink-0 text-[#6b6f93]">#1A66FC</p>
    </div>
  );
}

function Component600() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="600">
      <Color6 />
      <Text6 />
    </div>
  );
}

function Color7() {
  return (
    <div className="bg-[#afc9fe] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Primary 500</p>
      <p className="relative shrink-0 text-[#6b6f93]">#AFC9FE</p>
    </div>
  );
}

function Component500() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="500">
      <Color7 />
      <Text7 />
    </div>
  );
}

function Color8() {
  return (
    <div className="bg-[#ccddff] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Primary 300</p>
      <p className="relative shrink-0 text-[#6b6f93]">#CCDDFF</p>
    </div>
  );
}

function Component300() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="300">
      <Color8 />
      <Text8 />
    </div>
  );
}

function Color9() {
  return (
    <div className="bg-[#e8f0ff] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Primary 50</p>
      <p className="relative shrink-0 text-[#6b6f93]">#E8F0FF</p>
    </div>
  );
}

function Component50() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="50">
      <Color9 />
      <Text9 />
    </div>
  );
}

function Color10() {
  return (
    <div className="bg-[#f1f6ff] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Primary 25</p>
      <p className="relative shrink-0 text-[#6b6f93]">#d5e3ff</p>
    </div>
  );
}

function Component801() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="801">
      <Color10 />
      <Text10 />
    </div>
  );
}

function Primary1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Primary">
      <Component800 />
      <Component700 />
      <Component600 />
      <Component500 />
      <Component300 />
      <Component50 />
      <Component801 />
    </div>
  );
}

function Pallet1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Pallet">
      <p className="font-['Lato:Bold',_sans-serif] leading-[22px] not-italic relative shrink-0 text-[#40435b] text-[18px] text-nowrap whitespace-pre">Primary</p>
      <Primary1 />
    </div>
  );
}

function Color11() {
  return <div className="bg-[#0f6a54] rounded-[4px] shrink-0 size-[60px]" data-name="Color" />;
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Secondary 800</p>
      <p className="relative shrink-0 text-[#6b6f93]">#0F6A54</p>
    </div>
  );
}

function Component802() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="800">
      <Color11 />
      <Text11 />
    </div>
  );
}

function Color12() {
  return <div className="bg-[#159173] rounded-[4px] shrink-0 size-[60px]" data-name="Color" />;
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Secondary 700</p>
      <p className="relative shrink-0 text-[#6b6f93]">#159173</p>
    </div>
  );
}

function Component701() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="700">
      <Color12 />
      <Text12 />
    </div>
  );
}

function Color13() {
  return (
    <div className="bg-[#18a987] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">
        <span>{`Secondary `}</span>
        <span className="not-italic">600</span>
      </p>
      <p className="relative shrink-0 text-[#6b6f93]">#18A987</p>
    </div>
  );
}

function Component601() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="600">
      <Color13 />
      <Text13 />
    </div>
  );
}

function Color14() {
  return (
    <div className="bg-[#1dcca3] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">
        <span>{`Secondary `}</span>
        <span className="not-italic">500</span>
      </p>
      <p className="relative shrink-0 text-[#6b6f93]">#1DCCA3</p>
    </div>
  );
}

function Component501() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="500">
      <Color14 />
      <Text14 />
    </div>
  );
}

function Color15() {
  return (
    <div className="bg-[#aaf3e2] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">
        <span>{`Secondary `}</span>
        <span className="not-italic">300</span>
      </p>
      <p className="relative shrink-0 text-[#6b6f93]">#AAF3E2</p>
    </div>
  );
}

function Component301() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="300">
      <Color15 />
      <Text15 />
    </div>
  );
}

function Color16() {
  return (
    <div className="bg-[#dbfaf3] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap whitespace-pre" data-name="Text">
      <p className="relative shrink-0 text-[#40435b]">Secondary 50</p>
      <p className="relative shrink-0 text-[#6b6f93]">#DBFAF3</p>
    </div>
  );
}

function Component51() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[110px]" data-name="50">
      <Color16 />
      <Text16 />
    </div>
  );
}

function Secondary1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Secondary">
      <Component802 />
      <Component701 />
      <Component601 />
      <Component501 />
      <Component301 />
      <Component51 />
    </div>
  );
}

function Pallet2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Pallet">
      <p className="font-['Lato:Bold',_sans-serif] leading-[22px] not-italic relative shrink-0 text-[#40435b] text-[18px] text-nowrap whitespace-pre">Secondary</p>
      <Secondary1 />
    </div>
  );
}

function Color17() {
  return <div className="bg-[#40435b] rounded-[4px] shrink-0 size-[60px]" data-name="Color" />;
}

function Text17() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Neutral 800</p>
      <p className="relative shrink-0 text-[#6b6f93] text-nowrap whitespace-pre">#40435B</p>
    </div>
  );
}

function Component803() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="800">
      <Color17 />
      <Text17 />
    </div>
  );
}

function Color18() {
  return (
    <div className="bg-[#6b6f93] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[0] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="leading-[18px] relative shrink-0 text-[#40435b] w-[110px]">
        Neutral 7<span className="not-italic">00</span>
      </p>
      <p className="leading-[18px] relative shrink-0 text-[#6b6f93] w-[96px]">
        #<span className="font-['Lato:Regular',_sans-serif] not-italic">6B6F93</span>
      </p>
    </div>
  );
}

function Component702() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="700">
      <Color18 />
      <Text18 />
    </div>
  );
}

function Color19() {
  return (
    <div className="bg-[#acaec4] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">
        Neutral 5<span className="not-italic">00</span>
      </p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#ACAEC4</p>
    </div>
  );
}

function Component502() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="500">
      <Color19 />
      <Text19 />
    </div>
  );
}

function Color20() {
  return (
    <div className="bg-[#e0e1e9] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text20() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Neutral 300</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#E0E1E9</p>
    </div>
  );
}

function Component302() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="300">
      <Color20 />
      <Text20 />
    </div>
  );
}

function Color21() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">
        Neutral 5<span className="not-italic">0</span>
      </p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#F8F8F8</p>
    </div>
  );
}

function Component52() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="50">
      <Color21 />
      <Text21 />
    </div>
  );
}

function Color22() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text22() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">White</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#FFFFFF</p>
    </div>
  );
}

function White1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="White">
      <Color22 />
      <Text22 />
    </div>
  );
}

function Neutral1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Neutral">
      <Component803 />
      <Component702 />
      <Component502 />
      <Component302 />
      <Component52 />
      <White1 />
    </div>
  );
}

function Pallet3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Pallet">
      <p className="font-['Lato:Bold',_sans-serif] leading-[22px] not-italic relative shrink-0 text-[#40435b] text-[18px] text-nowrap whitespace-pre">Neutral</p>
      <Neutral1 />
    </div>
  );
}

function Color23() {
  return <div className="bg-[rgba(64,67,91,0.9)] rounded-[4px] shrink-0 size-[60px]" data-name="Color" />;
}

function Text23() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">
        <span>{`neutralAlpha `}</span>
        <span className="not-italic">800</span>
      </p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#40435B 90%</p>
    </div>
  );
}

function Component804() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="800">
      <Color23 />
      <Text23 />
    </div>
  );
}

function Color24() {
  return (
    <div className="bg-[rgba(107,111,147,0.72)] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text24() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[0] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="leading-[18px] relative shrink-0 text-[#40435b] w-[110px]">
        neutralAlpha 7<span className="not-italic">00</span>
      </p>
      <p className="leading-[18px] relative shrink-0 text-[#6b6f93] w-[96px]">
        #<span className="font-['Lato:Regular',_sans-serif] not-italic">6B6F93</span>
        <span>{` 72%`}</span>
      </p>
    </div>
  );
}

function Component703() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="700">
      <Color24 />
      <Text24 />
    </div>
  );
}

function Color25() {
  return (
    <div className="bg-[rgba(172,174,196,0.64)] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">
        neutralAlpha 5<span className="not-italic">00</span>
      </p>
      <p className="relative shrink-0 text-[#6b6f93] text-nowrap whitespace-pre">{`#ACAEC4 64% `}</p>
    </div>
  );
}

function Component503() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="500">
      <Color25 />
      <Text25 />
    </div>
  );
}

function Color26() {
  return (
    <div className="bg-[rgba(224,225,233,0.66)] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text26() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">neutralAlpha 300</p>
      <p className="relative shrink-0 text-[#6b6f93] text-nowrap whitespace-pre">{`#E0E1E9 6% `}</p>
    </div>
  );
}

function Component303() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="300">
      <Color26 />
      <Text26 />
    </div>
  );
}

function Color27() {
  return (
    <div className="bg-[rgba(64,67,91,0.04)] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">
        <span>{`neutralAlpha `}</span>
        <span className="not-italic">50</span>
      </p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#40435B 4%</p>
    </div>
  );
}

function Component53() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="50">
      <Color27 />
      <Text27 />
    </div>
  );
}

function Color28() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text28() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">whiteAlpha</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#FFFFFF 80%</p>
    </div>
  );
}

function White2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="White">
      <Color28 />
      <Text28 />
    </div>
  );
}

function NeutralAlpha() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="neutralAlpha">
      <Component804 />
      <Component703 />
      <Component503 />
      <Component303 />
      <Component53 />
      <White2 />
    </div>
  );
}

function Pallet4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Pallet">
      <p className="font-['Lato:Bold',_sans-serif] leading-[22px] not-italic relative shrink-0 text-[#40435b] text-[18px] text-nowrap whitespace-pre">neutralAlpha</p>
      <NeutralAlpha />
    </div>
  );
}

function Color29() {
  return (
    <div className="bg-[#3bc184] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text29() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Success 600</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#3BC184</p>
    </div>
  );
}

function Component602() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="600">
      <Color29 />
      <Text29 />
    </div>
  );
}

function Color30() {
  return (
    <div className="bg-[#b5e8d1] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text30() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Success 100</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#B5E8D1</p>
    </div>
  );
}

function Component100() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="100">
      <Color30 />
      <Text30 />
    </div>
  );
}

function Color31() {
  return (
    <div className="bg-[#ebf9f3] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text31() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Success 50</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#EBF9F3</p>
    </div>
  );
}

function Component54() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="50">
      <Color31 />
      <Text31 />
    </div>
  );
}

function Success() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Success">
      <Component602 />
      <Component100 />
      <Component54 />
    </div>
  );
}

function Color32() {
  return (
    <div className="bg-[#ffc700] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text32() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Warning 600</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#FFC700</p>
    </div>
  );
}

function Component603() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="600">
      <Color32 />
      <Text32 />
    </div>
  );
}

function Color33() {
  return (
    <div className="bg-[#ffea9f] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text33() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Warning 100</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#FFEA9F</p>
    </div>
  );
}

function Component101() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="100">
      <Color33 />
      <Text33 />
    </div>
  );
}

function Color34() {
  return (
    <div className="bg-[#fff9e6] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text34() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Warning 50</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#FFF9E6</p>
    </div>
  );
}

function Component55() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="50">
      <Color34 />
      <Text34 />
    </div>
  );
}

function Warning() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Warning">
      <Component603 />
      <Component101 />
      <Component55 />
    </div>
  );
}

function Color35() {
  return (
    <div className="bg-[#e22e2e] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text35() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Error 600</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#E22E2E</p>
    </div>
  );
}

function Component604() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="600">
      <Color35 />
      <Text35 />
    </div>
  );
}

function Color36() {
  return (
    <div className="bg-[#f8cbcb] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text36() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Error 100</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#F8CBCB</p>
    </div>
  );
}

function Component102() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="100">
      <Color36 />
      <Text36 />
    </div>
  );
}

function Color37() {
  return (
    <div className="bg-[#ffebeb] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text37() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Error 50</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#FFEBEB</p>
    </div>
  );
}

function Component56() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="50">
      <Color37 />
      <Text37 />
    </div>
  );
}

function Error() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Error">
      <Component604 />
      <Component102 />
      <Component56 />
    </div>
  );
}

function Color38() {
  return (
    <div className="bg-[#1a66fc] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text38() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Information 600</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#1A66FC</p>
    </div>
  );
}

function Component605() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="600">
      <Color38 />
      <Text38 />
    </div>
  );
}

function Color39() {
  return (
    <div className="bg-[#c6d9fe] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text39() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Information 100</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#C6D9FE</p>
    </div>
  );
}

function Component103() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="100">
      <Color39 />
      <Text39 />
    </div>
  );
}

function Color40() {
  return (
    <div className="bg-[#f2f7ff] relative rounded-[4px] shrink-0 size-[60px]" data-name="Color">
      <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_4px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text40() {
  return (
    <div className="content-stretch flex flex-col font-['Lato:Regular',_sans-serif] items-center leading-[18px] not-italic relative shrink-0 text-[14px] text-center" data-name="Text">
      <p className="relative shrink-0 text-[#40435b] w-[110px]">Information 50</p>
      <p className="relative shrink-0 text-[#6b6f93] w-[96px]">#F2F7FF</p>
    </div>
  );
}

function Component57() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="50">
      <Color40 />
      <Text40 />
    </div>
  );
}

function Information() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Information">
      <Component605 />
      <Component103 />
      <Component57 />
    </div>
  );
}

function Pallet5() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Pallet">
      <Success />
      <Warning />
      <Error />
      <Information />
    </div>
  );
}

function Pallet6() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Pallet">
      <p className="font-['Lato:Bold',_sans-serif] leading-[22px] not-italic relative shrink-0 text-[#40435b] text-[18px] text-nowrap whitespace-pre">Semantic</p>
      <Pallet5 />
    </div>
  );
}

function Pallet7() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start overflow-clip relative shrink-0 w-full" data-name="Pallet">
      <Content1 />
      <Alert />
      <Pallet1 />
      <Pallet2 />
      <Pallet3 />
      <Pallet4 />
      <Pallet6 />
    </div>
  );
}

export default function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative size-full" data-name="Content">
      <div className="font-['Lato:Regular',_'Noto_Sans:Regular',_sans-serif] leading-[18px] relative shrink-0 text-[#40435b] text-[14px] w-[500px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        <p className="mb-0 whitespace-pre-wrap">{`El color es uno de los fundamentos básicos de la interfaz de usuario. Ayuda y guía a los usuarios manteniendo la consistencia y jerarquía, vinculada al  `}</p>
        <p>brand de la marca.</p>
      </div>
      <Brand />
      <Divider />
      <Pallet7 />
    </div>
  );
}