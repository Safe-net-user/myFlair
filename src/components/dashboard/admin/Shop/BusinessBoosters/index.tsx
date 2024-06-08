"use client";

import type { BusinessBooster } from '@prisma/client';

import * as z from 'zod';

import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addDays, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { fr } from 'date-fns/locale';
import { zodResolver } from '@hookform/resolvers/zod';

import { businessBoosterSchema } from '@/schemas';
import { getAllBusinessBoosters, createBusinessBooster } from '@/data/services';



import { error, success, toastAction } from '@/components/toast';
import { ImageUploader } from '@/components/image-uploader';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormControl, FormField } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

import 'react-quill/dist/quill.snow.css';
import { DateRange } from 'react-day-picker';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TrashIcon } from '@radix-ui/react-icons';
export default function BusinessBoostersTab() {
  const router = useRouter();
  const { toast } = useToast();

  const [businessBoosters, setBusinessBoosters] = useState<BusinessBooster[]>(
    [],
  );

  const [currentDate, setCurrentDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const [dates, setDates] = useState<DateRange[]>([]);

  const form = useForm<z.infer<typeof businessBoosterSchema>>({
    resolver: zodResolver(businessBoosterSchema),
    defaultValues: {
      image: '',
      alt: '',
      title: '',
      description: '',
      quantity: 0,
      price: 0,
      dates,
    },
  });

  async function onSubmit(values: z.infer<typeof businessBoosterSchema>) {
    const response = await createBusinessBooster(values);

    if (response) {
      success(toast, {
        description: 'Business booster mis à jour',
      });

      setTimeout(() => router.refresh(), 1000);
    } else {
      error(toast, {
        action: toastAction(form.handleSubmit(onSubmit)),
      });
    }
  }

  useEffect(() => {
    (async () => setBusinessBoosters(await getAllBusinessBoosters()))();
  }, []);

  return (
    <TabsContent value="business-boosters" className="space-y-4">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Business boosters
          </h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Ajouter</Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-scroll">
              <ScrollArea>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogHeader>
                      <DialogTitle>Business booster</DialogTitle>
                      <DialogDescription>
                        Ajoutez un business booster.
                      </DialogDescription>
                      <div className="space-y-4">
                        <ImageUploader
                          callback={(url: string) =>
                            form.setValue('image', url)
                          }
                        />

                        <FormField
                          control={form.control}
                          name="alt"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="w-[200px]"
                                  placeholder="Texte alternatif"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="w-[200px]"
                                  placeholder="Titre"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <ReactQuill
                                  {...field}
                                  placeholder="Description"
                                  theme="snow"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="quantity"
                          render={() => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...form.register('quantity', {
                                    valueAsNumber: true,
                                  })}
                                  className="w-[200px]"
                                  placeholder="Quantité"
                                  type="number"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="price"
                          render={() => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...form.register('price', {
                                    valueAsNumber: true,
                                  })}
                                  className="w-[200px]"
                                  placeholder="Prix"
                                  type="number"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant={'outline'}
                              className="flex w-[200px] items-center"
                            >
                              {currentDate.from ? (
                                currentDate.to ? (
                                  <>
                                    {format(currentDate.from, 'dd LLL y', {
                                      locale: fr,
                                    })}{' '}
                                    -{' '}
                                    {format(currentDate.to, 'dd LLL y', {
                                      locale: fr,
                                    })}
                                  </>
                                ) : (
                                  format(currentDate.from, 'dd LLL y', {
                                    locale: fr,
                                  })
                                )
                              ) : (
                                <span>Choisir une date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="center">
                            <FormField
                              control={form.control}
                              name="dates"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Calendar
                                      {...field}
                                      initialFocus
                                      defaultMonth={currentDate.from}
                                      mode="range"
                                      locale={fr}
                                      numberOfMonths={2}
                                      onSelect={(date) =>
                                        date?.from && setCurrentDate(date)
                                      }
                                      selected={currentDate}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </PopoverContent>
                        </Popover>
                        <>
                          {dates.length > 0 && <p>Dates ajoutées:</p>}
                          {dates.map((date, index) => (
                            <div
                              className="flex items-center gap-2"
                              key={index}
                            >
                              {date.to ? (
                                <>
                                  {format(date.from!, 'dd LLL y', {
                                    locale: fr,
                                  })}{' '}
                                  -{' '}
                                  {format(date.to!, 'dd LLL y', {
                                    locale: fr,
                                  })}
                                </>
                              ) : (
                                format(date.from!, 'dd LLL y', {
                                  locale: fr,
                                })
                              )}
                              <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => {
                                  dates.splice(index, 1);
                                  setDates(dates);
                                }}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                              <br />
                            </div>
                          ))}
                        </>
                        <Button
                          onClick={() => {
                            setDates([...dates, currentDate]);
                            form.setValue('dates', dates);

                            setCurrentDate({
                              from: new Date(),
                              to: addDays(new Date(), 30),
                            });
                          }}
                          type="button"
                        >
                          Ajouter une date
                        </Button>
                      </div>
                    </DialogHeader>
                    <DialogFooter>
                      <Button type="submit">Ajouter</Button>
                    </DialogFooter>
                  </form>
                </Form>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

       
      </div>
    </TabsContent>
  );
}
