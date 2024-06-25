'use client'
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import "quill-paste-smart"
import 'react-quill/dist/quill.snow.css';


const getAndEditAdditionalService = () => {
    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Modification des Postes</h2>
            </div>
            <div style={{ margin: '0 auto' }} className="flex flex-col justify-center items-center">
                <form style={{ margin: '3%' }}>
                    <div>
                        <label>Titre</label>
                        <Input
                            type="text"
                            // value={title}
                            // onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        <label>Description</label>
                        <br />
                        <ReactQuill
                            // value={description}
                            // onChange={(value) => setDescription(value)}
                            placeholder="Rédigez votre description..."
                        />
                    </div>
                    <br />
                    <div>
                        <label>Heures d'ouverture en semaine</label>
                        <br />
                        <br />
                        <div className="flex space-x-2 items-center">
                            <Input
                                className="text-lg rounded outline-none"
                                type="number"
                                min="0"
                                max="23"
                                // value={post.durationWeekStartHour}
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="HH"
                                required
                            />
                            <span>h</span>
                            <Input
                                className="text-lg rounded outline-none"
                                type="number"
                                min="0"
                                max="59"
                                onWheel={(e) => e.currentTarget.blur()}
                                // value={post.durationWeekStartMinute}
                                placeholder="MM"
                                required
                            />
                            <span>à</span>
                            <Input
                                className="text-lg rounded outline-none"
                                type="number"
                                min="0"
                                max="23"
                                // value={post.durationWeekEndHour}
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="HH"
                                required
                            />
                            <span>h</span>
                            <Input
                                className="text-lg rounded outline-none"
                                type="number"
                                min="0"
                                max="59"
                                // value={post.durationWeekEndMinute}
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="MM"
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <label>Heures d'ouverture le samedi</label>
                        <br />
                        <br />
                        <div className="flex space-x-2 items-center">
                            <Input
                                className="text-lg rounded outline-none"
                                type="number"
                                min="0"
                                max="23"
                                // value={post.durationSaturdayStartHour}
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="HH"
                                required
                            />
                            <span>h</span>
                            <Input
                                className="text-lg rounded outline-none"
                                type="number"
                                min="0"
                                max="59"
                                // value={post.durationSaturdayStartMinute}
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="MM"
                                required
                            />
                            <span>à</span>
                            <Input
                                className="text-lg rounded outline-none"
                                type="number"
                                min="0"
                                max="23"
                                // value={post.durationSaturdayEndHour}
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="HH"
                                required
                            />
                            <span>h</span>
                            <Input
                                className="text-lg rounded outline-none"
                                type="number"
                                min="0"
                                max="59"
                                // value={post.durationSaturdayEndMinute}
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="MM"
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <label>Prix durant le Semaine</label>
                        <Input
                            type="number"
                            // value={post.weekPrice}
                            // onChange={(e) => setWeekPrice(parseInt(e.target.value))}
                        />
                    </div>
                    <br />
                    <div>
                        <label>Prix durant le Samedi</label>
                        <Input
                            type="number"
                            // value={post.saturdayPrice}
                            // onChange={(e) => setSaturdayPrice(parseInt(e.target.value))}
                        />
                    </div>
                    <br />
                    <div>
                        <label>Stock</label>
                        <Input
                            type="number"
                            // value={stock}
                            // onChange={(e) => setStock(parseInt(e.target.value))}
                        />
                    </div>
                    <br />
                    <br />
                    <Button type="submit">Enregistrer les modifications</Button>
                </form>
            </div>
        </div>
    );
};

export default getAndEditAdditionalService;
