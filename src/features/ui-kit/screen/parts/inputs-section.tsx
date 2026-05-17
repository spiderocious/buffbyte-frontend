import { useState } from 'react';
import { Field, Input, Textarea, Select, Slider } from '@shared/ui/input';
import { KitScene } from './kit-scene';

export function InputsSection() {
  const [sliderVal, setSliderVal] = useState(65);

  return (
    <div className="flex flex-col gap-6">
      <KitScene
        label="New analysis"
        description="The main compose form. Textarea + select + segmented tone + weight slider."
      >
        <div className="grid grid-cols-2 gap-x-[18px] gap-y-[14px]">
          <div className="col-span-2">
            <Field
              label="Your content"
              helper="231 of 5,000 characters. Around 40 words — readable in 12 seconds."
            >
              <Textarea
                placeholder="Paste your script or post copy here. The longer the draft, the more specific the coach can be — aim for at least 80 words."
                defaultValue="Spent some time last month building BuffByte AI. A short note on why I picked AI content analysis as the wedge, and what changed in week three."
              />
            </Field>
          </div>
          <Field label="Target platform">
            <Select defaultValue="twitter">
              <option value="twitter">Twitter / X</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
            </Select>
          </Field>
          <Field label="Region">
            <Select defaultValue="ng">
              <option value="ng">🇳🇬 Nigeria · NG</option>
              <option value="za">🇿🇦 South Africa</option>
              <option value="ke">🇰🇪 Kenya</option>
              <option value="gh">🇬🇭 Ghana</option>
            </Select>
          </Field>
          <Field
            label={`Score weight — ${sliderVal}% engagement, ${100 - sliderVal}% brand-fit`}
            helper={`Default balance · ${sliderVal}% engagement, ${100 - sliderVal}% brand-fit`}
            className="col-span-2"
          >
            <Slider
              value={sliderVal}
              min={0}
              max={100}
              onChange={(e) => setSliderVal(Number(e.target.value))}
            />
          </Field>
        </div>
      </KitScene>

      <KitScene label="Creator profile" description="Text inputs with chip-add and validation states.">
        <div className="grid grid-cols-2 gap-x-[18px] gap-y-[14px]">
          <Field label="Display name">
            <Input defaultValue="Adewale Adeniji" />
          </Field>
          <Field label="Account handle" helper="Used in shareable analysis links.">
            <Input defaultValue="@adewale" />
          </Field>
        </div>
      </KitScene>

      <KitScene label="Validation states">
        <div className="grid grid-cols-2 gap-x-[18px] gap-y-[14px]">
          <Field label="Email" helper="Used for shared analysis notifications.">
            <Input defaultValue="adenijiadewale12@gmail.com" />
          </Field>
          <Field label="New password" helper="Too short. Use at least 10 characters." status="error">
            <Input type="password" defaultValue="••••••" status="error" />
          </Field>
          <Field label="API key (read-only)">
            <Input defaultValue="bb_live_1f7a8c4d…" readOnly />
          </Field>
          <Field
            label="Daily analysis limit"
            helper="Approaching your plan limit (180 / 200 used today)."
            status="warn"
          >
            <Input defaultValue="200" status="warn" className="[font-variant-numeric:tabular-nums]" />
          </Field>
        </div>
      </KitScene>
    </div>
  );
}
