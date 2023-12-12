'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Header } from '../../../../payload/payload-types'
import { noHeaderFooterUrls } from '../../../constants'
import { Gutter } from '../../Gutter'
import { HeaderNav } from '../Nav'

import classes from './index.module.scss'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()

  // changing the theme of the logo based on the user's system theme
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const darkThemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkTheme(darkThemeQuery.matches)

    const themeChangeListener = (event: MediaQueryListEvent) => {
      setIsDarkTheme(event.matches)
    }

    darkThemeQuery.addEventListener('change', themeChangeListener)

    return () => {
      darkThemeQuery.removeEventListener('change', themeChangeListener)
    }
  }, [])

  return (
    <nav
      className={[
        classes.header,
        isDarkTheme ? classes.darkTheme : '',
        noHeaderFooterUrls.includes(pathname) && classes.height,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Gutter className={classes.wrap}>
        <Link href={'/'}>
          <Image
            src={isDarkTheme ? '/logo-black.svg' : '/logo-black.svg'}
            alt="logo"
            width={110}
            height={50}
          />
        </Link>

        <HeaderNav header={header} />
      </Gutter>
    </nav>
  )
}

export default HeaderComponent
