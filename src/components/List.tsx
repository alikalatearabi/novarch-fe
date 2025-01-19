'use client';

import { Spinner } from '@radix-ui/themes';
import React, { CSSProperties, useCallback } from 'react';
import MotionDiv from './transitions/MotionDiv';
import { twMerge } from 'tailwind-merge';

interface ListComponentProps<T> { 
    loading?: boolean;
    dataSource: T[];
    renderItem?: (item: T, index: number) => React.ReactElement;
    emptyElement?: React.ReactNode;
    animate?: boolean;
    gap?: CSSProperties['gap'];
    className?: string;
};

const ListComponent = <T,>({ loading, dataSource, renderItem, emptyElement, animate = true, gap, className }: ListComponentProps<T>) => {

    const animateProps = useCallback((index: number) => {
        if (!animate) return {};
        return {
            transition: { delay: 0.1*index },
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            layout: true,
        }
    }, [animate]);

    const renderFn = useCallback((item: T, index: number) => {
        if (renderItem) return renderItem(item, index);
        return item as React.ReactElement;
    }, [renderItem]);

    return (
        <div className={twMerge('flex flex-wrap gap-2 items-center', className)} style={{ gap }}>
            {loading && (
                <div className='self-center mx-auto'>
                    <Spinner size="3" />
                </div>
            )}
            {!loading && dataSource?.length <= 0 && (
                <div className='text-secondary self-center mt-8 mx-auto'>
                    {emptyElement || 'هیچ موردی برای نمایش وجود ندارد'}
                </div>
            )}
            {!loading && dataSource?.length > 0 && dataSource?.map((item, index) => (
                <MotionDiv {...animateProps(index)} key={index}>
                    {renderFn(item, index)}
                </MotionDiv>
            ))}
        </div>
    );
};

export default ListComponent;