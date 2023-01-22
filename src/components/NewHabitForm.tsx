import * as Checkbox from "@radix-ui/react-checkbox"

import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
]

export function NewHabitForm() {
  const [title, setTitle] = useState<string>("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function handleCreateNewHabit (event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0)
      return

    await api.post("habits", {
      title,
      weekDays
    })

    setTitle("")
    setWeekDays([])

    alert("Hábito criado com sucesso")

  }

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(state => state.filter(weekDay => weekDay !== weekDayIndex));
      return
    } 

    setWeekDays(state => [...state, weekDayIndex])
  }

  return (
    <form
      onSubmit={handleCreateNewHabit}
      className="w-full flex flex-col mt-6"
    >
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input 
        type="text" 
        id="title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus  
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">           
        {
          availableWeekDays.map((weekDay, index) => {
            return (
              <Checkbox.Root
                className="flex items-center group"
                key={weekDay}
                checked={weekDays.includes(index)}
                onCheckedChange={() => handleToggleWeekDay(index)}
              >
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500"
                >
                  <Checkbox.Indicator>
                    <Check 
                      size={20} 
                      weight="bold" 
                      className="text-white" 
                    />
                  </Checkbox.Indicator>
                </div>
      
                <span
                  className="text-white ml-3 leading-tight"
                >
                  {weekDay}
                </span>
              </Checkbox.Root>
            )
          })
        }
      </div>

      <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}