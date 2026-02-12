import svgPaths from "./svg-hfi8ubk2ei";

function Logo() {
  return (
    <div className="absolute h-[48px] left-0 top-1/2 translate-y-[-50%] w-[157.559px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 158 48">
        <g id="Logo">
          <path d={svgPaths.p2747d300} fill="var(--fill-0, #1A66FC)" id="Vector" />
          <g id="SecciÃ³n">
            <path d={svgPaths.p6376fb0} fill="var(--fill-0, #1A66FC)" />
            <path d={svgPaths.p1523fc80} fill="var(--fill-0, #1A66FC)" />
            <path d={svgPaths.p31f6d680} fill="var(--fill-0, #1A66FC)" />
            <path d={svgPaths.p3f281c70} fill="var(--fill-0, #1A66FC)" />
            <path d={svgPaths.pe6f700} fill="var(--fill-0, #1A66FC)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ItemLogo() {
  return (
    <div className="h-[48px] relative shrink-0 w-[216px]" data-name="Item/Logo">
      <Logo />
    </div>
  );
}

function Logo1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[24px] py-0 relative shrink-0" data-name="Logo">
      <ItemLogo />
    </div>
  );
}

function BasicHomeOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Basic/home/outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Basic/home/outline">
          <path d={svgPaths.p1fb07300} fill="var(--fill-0, #40435B)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-br-[99px] rounded-tr-[99px] shrink-0" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-0 pr-[12px] py-[8px] relative w-full">
          <BasicHomeOutline />
          <p className="basis-0 font-['Lato:Regular',_sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b6f93] text-[16px]">Inicio</p>
        </div>
      </div>
    </div>
  );
}

function ItemSimpleItem() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item/SimpleItem">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center pl-[36px] pr-0 py-0 relative w-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function BasicMessagesOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Basic/messages/outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Basic/messages/outline">
          <path d={svgPaths.p14010300} fill="var(--fill-0, #1A66FC)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-0 pr-[12px] py-[8px] relative w-full">
          <BasicMessagesOutline />
          <p className="basis-0 font-['Lato:Bold',_sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#1a66fc] text-[16px]">Conversations</p>
        </div>
      </div>
    </div>
  );
}

function ItemSimpleItem1() {
  return (
    <div className="bg-[#e8f0ff] content-stretch flex gap-[32px] items-center relative rounded-br-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Item/SimpleItem">
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#1a66fc] h-full rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[4px]" data-name="Line" />
      </div>
      <Content1 />
    </div>
  );
}

function Section() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pl-0 pr-[24px] py-0 relative w-full">
          <ItemSimpleItem />
          <ItemSimpleItem1 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Header">
      <Logo1 />
      <Section />
    </div>
  );
}

function Divider() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Divider">
      <div className="absolute bottom-full left-0 right-0 top-0" data-name="Line">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 216 1">
            <path d="M0 0.5H216" id="Line" stroke="var(--stroke-0, #E0E1E9)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Divider1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Divider">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[24px] py-0 relative w-full">
          <Divider />
        </div>
      </div>
    </div>
  );
}

function SemanticCircleQuestionOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Semantic/circle-question/outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Semantic/circle-question/outline">
          <path d={svgPaths.peda4c00} fill="var(--fill-0, #40435B)" id="icon" stroke="var(--stroke-0, #6B6F93)" />
        </g>
      </svg>
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-br-[99px] rounded-tr-[99px] shrink-0" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-0 pr-[12px] py-[8px] relative w-full">
          <SemanticCircleQuestionOutline />
          <p className="basis-0 font-['Lato:Regular',_sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b6f93] text-[16px]">Ayuda</p>
        </div>
      </div>
    </div>
  );
}

function ItemSimpleItem2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item/SimpleItem">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center pl-[36px] pr-[24px] py-0 relative w-full">
          <Content2 />
        </div>
      </div>
    </div>
  );
}

function NavigationArrowRightFromBracket() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Navigation/arrow-right-from-bracket">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Navigation/arrow-right-from-bracket">
          <path d={svgPaths.p106dc580} fill="var(--fill-0, #40435B)" id="icon" stroke="var(--stroke-0, #6B6F93)" />
        </g>
      </svg>
    </div>
  );
}

function Content3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-br-[99px] rounded-tr-[99px] shrink-0" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-0 pr-[12px] py-[8px] relative w-full">
          <NavigationArrowRightFromBracket />
          <p className="basis-0 font-['Lato:Regular',_sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b6f93] text-[16px]">Salir</p>
        </div>
      </div>
    </div>
  );
}

function ItemSimpleItem3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item/SimpleItem">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center pl-[36px] pr-[24px] py-0 relative w-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section">
      <ItemSimpleItem2 />
      <ItemSimpleItem3 />
    </div>
  );
}

function Footer() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Footer">
      <Divider1 />
      <Section1 />
    </div>
  );
}

function Navbar() {
  return (
    <div className="absolute bg-white bottom-0 box-border content-stretch flex flex-col items-center justify-between left-0 px-0 py-[24px] right-[5.71%] top-0" data-name="Navbar">
      <div aria-hidden="true" className="absolute border-[#e0e1e9] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Header />
      <Footer />
    </div>
  );
}

function NavigationChevronChevronLeft() {
  return (
    <div className="relative size-[16px]" data-name="Navigation/chevron/chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Navigation/chevron/chevron-left">
          <path d={svgPaths.p36c4d80} fill="var(--fill-0, #40435B)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function ItemChevron() {
  return (
    <div className="absolute bg-white bottom-[94.14%] box-border content-stretch flex items-start left-[88.57%] p-[8px] right-0 rounded-[999px] shadow-[0px_10px_15px_-3px_rgba(64,67,91,0.1),0px_4px_6px_-2px_rgba(64,67,91,0.05)] top-[2.73%]" data-name="Item/Chevron">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <NavigationChevronChevronLeft />
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div className="absolute h-[1024px] left-0 top-0 w-[280px]" data-name="NavBar">
      <Navbar />
      <ItemChevron />
    </div>
  );
}

function Title() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Title">
      <div className="basis-0 flex flex-col font-['Lato:Bold',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#40435b] text-[24px]">
        <p className="leading-[28px]">A</p>
      </div>
    </div>
  );
}

function BasicBellOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Basic/bell/outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Basic/bell/outline">
          <path d={svgPaths.p21bd9200} fill="var(--fill-0, #1A66FC)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function UserCircleUserOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="User/circle-user/outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="User/circle-user/outline">
          <path d={svgPaths.pcfc7580} fill="var(--fill-0, #1A66FC)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] items-center justify-end px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Badge">
      <p className="font-['Lato:Regular',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[#40435b] text-[14px] text-nowrap text-right whitespace-pre">López, Marcos</p>
      <UserCircleUserOutline />
    </div>
  );
}

function Access() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Access">
      <BasicBellOutline />
      <Badge />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Content">
      <Title />
      <Access />
    </div>
  );
}

function Desktop() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[264px] pb-[16px] pt-[30px] px-[64px] top-0 w-[1176px]" data-name="Desktop">
      <div aria-hidden="true" className="absolute border-[#e0e1e9] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Content4 />
    </div>
  );
}

function BasicCard() {
  return (
    <div className="bg-white h-[850px] relative rounded-[16px] shadow-[0px_1px_3px_0px_rgba(64,67,91,0.1),0px_1px_2px_0px_rgba(64,67,91,0.06)] shrink-0 w-full" data-name="BasicCard">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="h-[850px] w-full" />
      </div>
    </div>
  );
}

function Frame1000002806() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[850px] items-start left-[377px] top-[130px] w-[890px]">
      <BasicCard />
    </div>
  );
}

export default function Admin() {
  return (
    <div className="bg-[#f8f8f8] relative rounded-[16px] shadow-[0px_1px_3px_0px_rgba(64,67,91,0.1),0px_1px_2px_0px_rgba(64,67,91,0.06)] size-full" data-name="Admin">
      <NavBar />
      <Desktop />
      <Frame1000002806 />
    </div>
  );
}