import svgPaths from "./svg-2c8vuvkdai";

function Label() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Label">
      <p className="font-['Lato:Bold',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[#40435b] text-[16px] text-nowrap whitespace-pre">¿Para quién es el turno?</p>
    </div>
  );
}

function LabelTooltip() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[320px]" data-name="Label+Tooltip">
      <Label />
    </div>
  );
}

function LabelCaption() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label+Caption">
      <LabelTooltip />
    </div>
  );
}

function Frame2609108() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Lato:Regular',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[#40435b] text-[16px] text-nowrap whitespace-pre">Ricardo Rivero</p>
    </div>
  );
}

function TextLink() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text link">
      <p className="font-['Lato:Bold',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1a66fc] text-[12px] text-nowrap whitespace-pre">Cambiar</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Content">
      <TextLink />
    </div>
  );
}

function ArrowsRepeat() {
  return (
    <div className="relative size-full" data-name="arrows-repeat">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_5004_4320)" id="arrows-repeat">
          <path d={svgPaths.p25cae480} fill="var(--fill-0, #1A66FC)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_5004_4320">
            <rect fill="white" height="13.3333" width="13.3333" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <div className="absolute flex inset-[8.333%] items-center justify-center">
        <div className="flex-none scale-y-[-100%] size-[13.333px]">
          <ArrowsRepeat />
        </div>
      </div>
    </div>
  );
}

function TextLink1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="TextLink">
      <Content />
      <Icon1 />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="Text">
      <Frame2609108 />
      <TextLink1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Text />
    </div>
  );
}

function BasicCard() {
  return (
    <div className="bg-white relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(64,67,91,0.1),0px_1px_2px_0px_rgba(64,67,91,0.06)] shrink-0 w-full" data-name="BasicCard">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative w-full">
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function FormControl11() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="FormControl11">
      <LabelCaption />
      <BasicCard />
    </div>
  );
}

function Label1() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Label">
      <p className="font-['Lato:Bold',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[#40435b] text-[16px] text-nowrap whitespace-pre">¿Qué cobertura tenés?</p>
    </div>
  );
}

function LabelTooltip1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[320px]" data-name="Label+Tooltip">
      <Label1 />
    </div>
  );
}

function LabelCaption1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label+Caption">
      <LabelTooltip1 />
    </div>
  );
}

function Frame2609109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Lato:Regular',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[#40435b] text-[16px] text-nowrap whitespace-pre">Plan Austral</p>
    </div>
  );
}

function TextLink2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text link">
      <p className="font-['Lato:Bold',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1a66fc] text-[12px] text-nowrap whitespace-pre">Cambiar</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Content">
      <TextLink2 />
    </div>
  );
}

function ArrowsRepeat1() {
  return (
    <div className="relative size-full" data-name="arrows-repeat">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_5004_4320)" id="arrows-repeat">
          <path d={svgPaths.p25cae480} fill="var(--fill-0, #1A66FC)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_5004_4320">
            <rect fill="white" height="13.3333" width="13.3333" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
      <div className="absolute flex inset-[8.333%] items-center justify-center">
        <div className="flex-none scale-y-[-100%] size-[13.333px]">
          <ArrowsRepeat1 />
        </div>
      </div>
    </div>
  );
}

function TextLink3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="TextLink">
      <Content2 />
      <Icon3 />
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="Text">
      <Frame2609109 />
      <TextLink3 />
    </div>
  );
}

function Content3() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Text1 />
    </div>
  );
}

function BasicCard1() {
  return (
    <div className="bg-white relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(64,67,91,0.1),0px_1px_2px_0px_rgba(64,67,91,0.06)] shrink-0 w-full" data-name="BasicCard">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative w-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function FormControl12() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="FormControl11">
      <LabelCaption1 />
      <BasicCard1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Label">
      <p className="font-['Lato:Bold',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[#40435b] text-[16px] text-nowrap whitespace-pre">¿Qué turnos necesitás?</p>
    </div>
  );
}

function LabelTooltip2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Label+Tooltip">
      <Label2 />
    </div>
  );
}

function LabelCaption2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label+Caption">
      <LabelTooltip2 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3b7a8b70} fill="var(--fill-0, #ACAEC4)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#acaec4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center px-[16px] py-[10px] relative w-full">
          <Icon4 />
          <div className="basis-0 flex flex-col font-['Lato:Regular',_sans-serif] grow h-[24px] justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#acaec4] text-[16px] text-nowrap">
            <p className="[white-space-collapse:collapse] leading-[20px] overflow-ellipsis overflow-hidden">Especialidad o profesional</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormControl() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="FormControl">
      <Input />
    </div>
  );
}

function FormControl6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="FormControl6">
      <LabelCaption2 />
      <FormControl />
    </div>
  );
}

function Frame2609253() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <FormControl11 />
      <FormControl12 />
      <FormControl6 />
    </div>
  );
}

function Content4() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[24px] items-start left-0 px-[16px] py-0 top-[93px] w-[360px]" data-name="Content">
      <Frame2609253 />
    </div>
  );
}

function NavigationArrowArrowLeft() {
  return (
    <button className="block cursor-pointer relative shrink-0 size-[24px]" data-name="Navigation/arrow/arrow-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Navigation/arrow/arrow-left">
          <path d={svgPaths.p2506d500} fill="var(--fill-0, #1A66FC)" id="icon" />
        </g>
      </svg>
    </button>
  );
}

function MenuLogo() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Menu + logo">
      <NavigationArrowArrowLeft />
      <p className="basis-0 font-['Lato:Bold',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#40435b] text-[18px]">Agendar turno</p>
    </div>
  );
}

function Content5() {
  return (
    <div className="basis-0 content-stretch flex gap-[104px] grow h-[32px] items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <MenuLogo />
    </div>
  );
}

function Mobile() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[80px] items-center justify-center left-0 px-[16px] py-[20px] top-0 w-[360px]" data-name="Mobile">
      <Content5 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1a66fc] box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[10px] relative rounded-[8px] shrink-0 w-[328px]" data-name="Button">
      <p className="font-['Lato:Bold',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Continuar</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Button">
      <Button />
    </div>
  );
}

function FixedButton() {
  return (
    <div className="absolute bg-white bottom-0 box-border content-stretch flex flex-col gap-[10px] items-center left-[-0.16px] px-[16px] py-[24px] shadow-[0px_-4px_15px_-3px_rgba(64,67,91,0.1),0px_-4px_6px_-2px_rgba(64,67,91,0.05)] w-[360px]" data-name="Fixed button">
      <Button1 />
    </div>
  );
}

export default function Paciente14() {
  return (
    <div className="bg-[#f8f8f8] relative size-full" data-name="Paciente 14">
      <Content4 />
      <Mobile />
      <FixedButton />
    </div>
  );
}